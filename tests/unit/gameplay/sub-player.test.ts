import { describe, expect, it, vi } from "vitest"
import { Player } from "../../../src/gameplay/player"
import type { SubShooterConfig } from "../../../src/gameplay/types"

const config: SubShooterConfig = {
  player_max_speed: 260, player_acceleration: 1400, player_drag: 1800,
  player_max_hp: 3, player_invincibility_ms: 1200,
  projectile_speed: 520, projectile_cooldown_ms: 260, projectile_lifetime_ms: 1200, projectile_max_active: 4,
  fuel_max: 60, fuel_drain_per_second: 1, fuel_refill_amount: 20,
  fuel_empty_damage_interval_ms: 3000, fuel_low_threshold: 0.2,
  score_per_treasure: 100, score_per_enemy: 50,
  spawn_y_min: 80, spawn_y_max: 520,
  fish_max_active: 4, mine_max_active: 3, treasure_max_active: 3, fuel_max_active: 1,
  enemy_spawn_interval_start_ms: 1600, enemy_spawn_interval_min_ms: 800,
  mine_spawn_interval_start_ms: 3500, mine_spawn_interval_min_ms: 1800,
  treasure_spawn_interval_ms: 2400, fuel_spawn_interval_ms: 8000,
  enemy_speed_start: 120, enemy_speed_max: 220,
  world_scroll_speed: 90, difficulty_ramp_seconds: 20,
}

function makePlayer(): Player {
  return new Player(config, 800, 600)
}

describe("SubPlayer", () => {
  it("moves right when right is held", () => {
    const p = makePlayer()
    for (let i = 0; i < 10; i++) p.update(1 / 60, false, true, false, false)
    expect(p.x).toBeGreaterThan(80)
  })

  it("takes damage and becomes invincible", () => {
    const p = makePlayer()
    const hit = p.takeDamage()
    expect(hit).toBe(true)
    expect(p.hp).toBe(2)
    expect(p.invincible).toBe(true)
  })

  it("invincibility prevents repeated damage", () => {
    const p = makePlayer()
    p.takeDamage()
    const second = p.takeDamage()
    expect(second).toBe(false)
    expect(p.hp).toBe(2)
  })

  it("dies at 0 hp", () => {
    const p = makePlayer()
    while (p.hp > 0 && p.alive) {
      p.invincibleUntil = 0
      p.takeDamage()
    }
    expect(p.alive).toBe(false)
  })
})
