import { describe, it, expect } from "vitest"
import { applyPhysics } from "../../../src/gameplay/physics/movement"
import { resolveCollisions } from "../../../src/gameplay/physics/collision"
import type { MovementConfig, PlayerState, Platform, InputState, Particle } from "../../../src/gameplay/physics/types"

const BALANCED: MovementConfig = {
  maxSpeed: 450, acceleration: 2000, deceleration: 2500, turnMultiplier: 2.0,
  jumpForce: 750, gravity: 1500, fallGravityMultiplier: 1.5, terminalVelocity: 1200,
  airControl: 0.8, airFriction: 400,
  jumpCancelMode: "partial", minJumpHold: 0.05, maxJumpHold: 0.35, earlyReleaseGravityMultiplier: 2.5,
  elasticity: 1.0, squashRecoveryRate: 15, coyoteTime: 0.1, jumpBuffer: 0.1,
}

function createPlayer(overrides?: Partial<PlayerState>): PlayerState {
  return {
    x: 100, y: 600, vx: 0, vy: 0, width: 32, height: 32,
    isGrounded: true, isJumping: false, wasJumping: false,
    coyoteTimer: 0, jumpBufferTimer: 0,
    squashX: 1, squashY: 1, isDead: false, deathTimer: 0,
    currentJumpTime: 0, jumpState: "Ground" as const,
    trail: [],
    jumpStartHeight: 0, jumpStartX: 0, jumpStartTime: 0, peakHeight: 0,
    ...overrides,
  }
}

const NO_INPUT: InputState = { left: false, right: false, up: false, down: false, jump: false, jumpPressedThisFrame: false }
const GROUND: Platform = { x: 0, y: 640, width: 800, height: 40 }
const DT = 1 / 120

describe("applyPhysics", () => {
  it("accelerates horizontally when moving right", () => {
    const player = createPlayer({ x: 200 })
    const input: InputState = { ...NO_INPUT, right: true }
    const particles: Particle[] = []

    for (let i = 0; i < 30; i++)
      applyPhysics(player, BALANCED, input, DT, [GROUND], particles)

    expect(player.vx).toBeGreaterThan(0)
    expect(player.x).toBeGreaterThan(200)
  })

  it("gravity makes airborne player fall", () => {
    const player = createPlayer({ x: 200, y: 400, isGrounded: false, vy: 0 })
    const particles: Particle[] = []
    const initialY = player.y

    for (let i = 0; i < 30; i++)
      applyPhysics(player, BALANCED, NO_INPUT, DT, [GROUND], particles)

    expect(player.vy).toBeGreaterThan(0)
    expect(player.y).toBeGreaterThan(initialY)
  })

  it("ground collision stops falling and sets grounded", () => {
    const player = createPlayer({ x: 200, y: 638, isGrounded: false, vy: 5 })
    const particles: Particle[] = []

    applyPhysics(player, BALANCED, NO_INPUT, DT, [GROUND], particles)

    expect(player.isGrounded).toBe(true)
    expect(player.vy).toBe(0)
  })

  it("hazard collision triggers death", () => {
    const hazard: Platform = { x: 180, y: 598, width: 80, height: 10, isHazard: true }
    const player = createPlayer({ x: 200, y: 590, isGrounded: false, vy: 5 })
    const particles: Particle[] = []

    applyPhysics(player, BALANCED, NO_INPUT, DT, [hazard], particles)

    expect(player.isDead).toBe(true)
    expect(player.deathTimer).toBeGreaterThan(0)
  })

  it("jump produces upward velocity with buffer and coyote time", () => {
    const player = createPlayer({ x: 200, y: 600, isGrounded: true, coyoteTimer: 0.1, jumpBufferTimer: 0.1 })
    const input: InputState = { ...NO_INPUT, jump: true, jumpPressedThisFrame: true }
    const particles: Particle[] = []

    applyPhysics(player, BALANCED, input, DT, [GROUND], particles)

    expect(player.vy).toBeLessThan(0)
    expect(player.isJumping).toBe(true)
    expect(player.isGrounded).toBe(false)
    expect(player.jumpState).toBe("Rising_Controlled")
  })
})

describe("resolveCollisions", () => {
  it("detects horizontal collision and stops x velocity", () => {
    const platform: Platform = { x: 200, y: 400, width: 60, height: 40 }
    const player = createPlayer({ x: 190, y: 400, vx: 50, vy: 0 })
    const particles: Particle[] = []

    resolveCollisions(player, [platform], particles, "x")

    expect(player.vx).toBe(0)
    expect(player.x).toBe(200 - player.width)
  })

  it("detects vertical collision from above and sets grounded", () => {
    const platform: Platform = { x: 0, y: 640, width: 800, height: 40 }
    const player = createPlayer({ x: 200, y: 615, vx: 0, vy: 10, isGrounded: false })
    const particles: Particle[] = []

    resolveCollisions(player, [platform], particles, "y")

    expect(player.isGrounded).toBe(true)
    expect(player.vy).toBe(0)
    expect(player.y).toBe(640 - player.height)
  })
})
