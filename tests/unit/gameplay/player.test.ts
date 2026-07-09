import { describe, expect, it } from 'vitest'
import { Player, type PlayerInput } from '../../../src/gameplay/player'

const idleInput: PlayerInput = {
  left: false,
  right: false,
  jump: false,
  restart: false,
}

function makePlayer(): Player {
  return new Player({
    x: 0,
    y: 64,
    width: 20,
    height: 30,
    speed: 100,
    jumpVelocity: 300,
    gravity: 600,
    maxFallSpeed: 500,
  })
}

function step(player: Player, count: number, input: PlayerInput, platforms: { id: string; x: number; y: number; width: number; height: number }[]): void {
  for (let i = 0; i < count; i++) {
    player.update(1 / 60, input, platforms)
  }
}

describe('Player', () => {
  it('moves right when right input is held', () => {
    const player = makePlayer()
    step(player, 30, { ...idleInput, right: true }, [])
    expect(player.x).toBeCloseTo(50, 1)
  })

  it('lands on platforms while falling', () => {
    const player = makePlayer()
    const floor = [{ id: 'floor', x: -20, y: 120, width: 100, height: 20 }]
    step(player, 120, idleInput, floor)
    expect(player.y).toBe(90)
    expect(player.vy).toBe(0)
    expect(player.grounded).toBe(true)
  })

  it('starts a jump only from the ground', () => {
    const player = makePlayer()
    const floor = [{ id: 'floor', x: -20, y: 120, width: 100, height: 20 }]
    step(player, 120, idleInput, floor)
    step(player, 1, { ...idleInput, jump: true }, floor)
    expect(player.vy).toBeLessThan(0)
    expect(player.grounded).toBe(false)
  })
})
