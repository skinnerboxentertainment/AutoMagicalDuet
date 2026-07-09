import { describe, expect, it } from "vitest"
import { SpawnDirector } from "../../../src/gameplay/spawn-director"
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

describe("SpawnDirector", () => {
  it("starts with no entities", () => {
    const sd = new SpawnDirector(config, 800)
    expect(sd.fish.length).toBe(0)
    expect(sd.mines.length).toBe(0)
    expect(sd.treasures.length).toBe(0)
    expect(sd.fuelCans.length).toBe(0)
  })

  it("respects fish max cap", () => {
    const sd = new SpawnDirector(config, 800)
    for (let i = 0; i < 200; i++) sd.update(1 / 60)
    expect(sd.fish.length).toBeLessThanOrEqual(config.fish_max_active)
  })

  it("respects mine max cap", () => {
    const sd = new SpawnDirector(config, 800)
    for (let i = 0; i < 200; i++) sd.update(1 / 60)
    expect(sd.mines.length).toBeLessThanOrEqual(config.mine_max_active)
  })

  it("resets correctly", () => {
    const sd = new SpawnDirector(config, 800)
    for (let i = 0; i < 120; i++) sd.update(1 / 60)
    sd.reset()
    expect(sd.fish.length).toBe(0)
    expect(sd.mines.length).toBe(0)
    expect(sd.treasures.length).toBe(0)
    expect(sd.fuelCans.length).toBe(0)
  })
})
