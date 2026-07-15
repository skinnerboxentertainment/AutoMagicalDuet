import { Application, Container, Graphics, Text, TextStyle } from "pixi.js"
import { PlayerState, Platform, Particle, InputState, MovementConfig } from "./physics/types"
import { applyPhysics } from "./physics/movement"
import { PRESETS, PRESET_NAMES } from "./presets"
import { InputManager } from "../core/input-manager"

const WORLD_W = 1280
const WORLD_H = 1024
const PLAYER_SIZE = 32

const DEFAULT_PLATFORMS: Platform[] = [
  { x: 0, y: WORLD_H - 40, width: WORLD_W, height: 40 },
  { x: -40, y: 0, width: 40, height: WORLD_H },
  { x: WORLD_W, y: 0, width: 40, height: WORLD_H },
  { x: 200, y: WORLD_H - 140, width: 180, height: 20 },
  { x: 500, y: WORLD_H - 260, width: 140, height: 20 },
  { x: 750, y: WORLD_H - 380, width: 120, height: 20 },
  { x: 400, y: WORLD_H - 200, width: 40, height: 40 },
  { x: 500, y: WORLD_H - 58, width: 400, height: 10, isHazard: true },
]

export class JumpScene {
  private app: Application
  private input: InputManager
  private gameContainer: Container
  private player!: PlayerState
  private config!: MovementConfig
  private inputState!: InputState
  private platforms: Platform[] = DEFAULT_PLATFORMS
  private particles: Particle[] = []

  private playerGfx: Graphics
  private platformGfx: Graphics
  private particleGfx: Graphics
  private trailGfx: Graphics
  private hudText: Text
  private presetText: Text
  private presetIdx = 1

  private gamepadIndex: number | null = null

  constructor(app: Application, input: InputManager) {
    this.app = app
    this.input = input
    this.gameContainer = new Container()
    app.stage.addChild(this.gameContainer)

    this.config = PRESETS[PRESET_NAMES[this.presetIdx]]
    this.inputState = {
      left: false, right: false, up: false, down: false,
      jump: false, jumpPressedThisFrame: false,
    }
    this.player = this.createPlayer()
    this.platforms = DEFAULT_PLATFORMS.map(p => ({ ...p }))

    this.trailGfx = new Graphics()
    this.platformGfx = new Graphics()
    this.particleGfx = new Graphics()
    this.playerGfx = new Graphics()
    this.gameContainer.addChild(this.trailGfx)
    this.gameContainer.addChild(this.platformGfx)
    this.gameContainer.addChild(this.particleGfx)
    this.gameContainer.addChild(this.playerGfx)

    const style = new TextStyle({ fontFamily: "monospace", fontSize: 14, fill: "#888" })
    this.hudText = new Text({ text: "", style })
    this.hudText.x = 10
    this.hudText.y = 10
    this.gameContainer.addChild(this.hudText)

    const presetStyle = new TextStyle({ fontFamily: "monospace", fontSize: 16, fill: "#6a5acd", fontWeight: "bold" })
    this.presetText = new Text({ text: "", style: presetStyle })
    this.presetText.x = 10
    this.presetText.y = WORLD_H - 30
    this.gameContainer.addChild(this.presetText)

    this.setupGamepad()
  }

  private createPlayer(): PlayerState {
    return {
      x: 100, y: WORLD_H - 100,
      vx: 0, vy: 0,
      width: PLAYER_SIZE, height: PLAYER_SIZE,
      isGrounded: false, isJumping: false, wasJumping: false,
      coyoteTimer: 0, jumpBufferTimer: 0,
      squashX: 1, squashY: 1,
      isDead: false, deathTimer: 0,
      currentJumpTime: 0, jumpState: "Ground",
      trail: [],
      jumpStartHeight: 0, jumpStartX: 0, jumpStartTime: 0, peakHeight: 0,
    }
  }

  private setupGamepad() {
    const onConnected = (e: GamepadEvent) => { this.gamepadIndex = e.gamepad.index }
    const onDisconnected = () => { this.gamepadIndex = null }
    window.addEventListener("gamepadconnected", onConnected)
    window.addEventListener("gamepaddisconnected", onDisconnected)
  }

  private pollGamepad(): { axis: number; jump: boolean; jumpJustPressed: boolean } {
    if (this.gamepadIndex === null) return { axis: 0, jump: false, jumpJustPressed: false }
    const gp = navigator.getGamepads()[this.gamepadIndex]
    if (!gp) return { axis: 0, jump: false, jumpJustPressed: false }

    let axis = gp.axes[0] ?? 0
    if (Math.abs(axis) < 0.3) axis = 0
    const jump = gp.buttons[0]?.pressed ?? false

    return { axis, jump, jumpJustPressed: false }
  }

  update(dt: number) {
    const keys = this.input.keys
    const justPressed = this.input.keysJustPressed

    const gp = this.pollGamepad()
    const gpAxis = gp.axis

    this.inputState.left = keys.has("ArrowLeft") || keys.has("KeyA") || gpAxis < -0.3
    this.inputState.right = keys.has("ArrowRight") || keys.has("KeyD") || gpAxis > 0.3
    this.inputState.jump = keys.has("Space") || keys.has("ArrowUp") || keys.has("KeyW") || gp.jump
    this.inputState.jumpPressedThisFrame = justPressed.has("Space") || justPressed.has("ArrowUp") || justPressed.has("KeyW") || gp.jumpJustPressed

    for (let i = 0; i < 4; i++) {
      applyPhysics(this.player, this.config, this.inputState, dt / 4, this.platforms, this.particles)
      this.inputState.jumpPressedThisFrame = false
    }

    if (justPressed.has("KeyP") || justPressed.has("NumpadAdd")) {
      this.presetIdx = (this.presetIdx + 1) % PRESET_NAMES.length
      this.config = PRESETS[PRESET_NAMES[this.presetIdx]]
      this.player = this.createPlayer()
    }

    this.render()
  }

  private render() {
    const g = this.playerGfx
    g.clear()

    const s = this.player
    const sx = s.squashX
    const sy = s.squashY
    const cx = s.x + s.width / 2
    const cy = s.y + s.height / 2
    const w = s.width * sx
    const h = s.height * sy

    if (s.isDead) {
      g.rect(cx - w / 2, cy - h / 2, w, h)
      g.fill({ color: 0xf43f5e, alpha: 0.6 })
    } else {
      g.rect(cx - w / 2, cy - h / 2, w, h)
      g.fill({ color: s.isGrounded ? 0x4ade80 : 0x6a5acd })
    }

    this.trailGfx.clear()
    for (let i = 0; i < s.trail.length; i++) {
      const t = s.trail[i]
      const alpha = 0.1 + 0.3 * (i / s.trail.length)
      this.trailGfx.circle(t.x, t.y, 3)
      this.trailGfx.fill({ color: 0x6a5acd, alpha })
    }

    this.platformGfx.clear()
    for (const p of this.platforms) {
      if (p.isHazard) {
        this.platformGfx.rect(p.x, p.y, p.width, p.height)
        this.platformGfx.fill({ color: 0xef4444, alpha: 0.5 })
      } else {
        this.platformGfx.rect(p.x, p.y, p.width, p.height)
        this.platformGfx.fill({ color: 0x2a2a3e })
      }
    }

    this.particleGfx.clear()
    for (const p of this.particles) {
      const alpha = Math.max(0, p.life / p.maxLife)
      this.particleGfx.circle(p.x, p.y, p.size * alpha)
      this.particleGfx.fill({ color: 0xd4d4d8, alpha })
    }

    const velInfo = `vx: ${Math.round(s.vx)}  vy: ${Math.round(s.vy)}  ground: ${s.isGrounded}  state: ${s.jumpState}`
    this.hudText.text = velInfo

    this.presetText.text = `[P] Preset: ${PRESET_NAMES[this.presetIdx]}`
  }

  destroy() {
    this.app.stage.removeChild(this.gameContainer)
    this.gameContainer.destroy({ children: true })
  }
}
