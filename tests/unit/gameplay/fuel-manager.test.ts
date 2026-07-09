import { describe, expect, it } from "vitest"
import { FuelManager } from "../../../src/gameplay/fuel-manager"
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

describe("FuelManager", () => {
  it("starts full", () => {
    const fm = new FuelManager(config)
    expect(fm.fuel).toBe(60)
    expect(fm.isLow).toBe(false)
    expect(fm.isEmpty).toBe(false)
  })

  it("drains over time", () => {
    const fm = new FuelManager(config)
    fm.update(10)
    expect(fm.fuel).toBeCloseTo(50, 0)
  })

  it("clamps at 0", () => {
    const fm = new FuelManager(config)
    fm.update(999)
    expect(fm.fuel).toBe(0)
    expect(fm.isEmpty).toBe(true)
  })

  it("refills without exceeding max", () => {
    const fm = new FuelManager(config)
    fm.update(30)
    expect(fm.fuel).toBeCloseTo(30, 0)
    fm.refill()
    expect(fm.fuel).toBeCloseTo(50, 0)
    fm.refill()
    expect(fm.fuel).toBe(60)
  })

  it("triggers low fuel warning", () => {
    const fm = new FuelManager(config)
    fm.update(50)
    expect(fm.isLow).toBe(true)
  })

  it("returns damage ticks when empty", () => {
    const fm = new FuelManager(config)
    const dmg = fm.update(999)
    expect(dmg).toBeGreaterThanOrEqual(1)
  })

  it("resets correctly", () => {
    const fm = new FuelManager(config)
    fm.update(40)
    fm.reset()
    expect(fm.fuel).toBe(60)
    expect(fm.isEmpty).toBe(false)
    expect(fm.isLow).toBe(false)
  })
})
