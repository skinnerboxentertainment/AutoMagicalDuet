import type { SubShooterConfig, Fish, Mine, Treasure, FuelCan, SpawnTimers, DifficultyState } from "./types"
import { spawnFish, spawnMine, spawnTreasure, spawnFuelCan } from "./enemy"

export class SpawnDirector {
  private timers: SpawnTimers
  private time = 0
  private startTime = 0
  private lastDamageTime = -999
  private fishPool: Fish[] = []
  private minePool: Mine[] = []
  private treasurePool: Treasure[] = []
  private fuelPool: FuelCan[] = []

  readonly diff: DifficultyState

  constructor(private readonly config: SubShooterConfig, private readonly canvasW: number) {
    this.timers = {
      fish: 0, mine: 0, treasure: 0, fuel: 0,
    }
    this.diff = {
      elapsed: 0,
      fishSpawnInterval: config.enemy_spawn_interval_start_ms / 1000,
      mineSpawnInterval: config.mine_spawn_interval_start_ms / 1000,
      enemySpeed: config.enemy_speed_start,
    }
  }

  get fish(): Fish[] { return this.fishPool }
  get mines(): Mine[] { return this.minePool }
  get treasures(): Treasure[] { return this.treasurePool }
  get fuelCans(): FuelCan[] { return this.fuelPool }

  reset(): void {
    this.fishPool = []
    this.minePool = []
    this.treasurePool = []
    this.fuelPool = []
    this.time = 0
    this.timers = { fish: 0, mine: 0, treasure: 0, fuel: 0 }
    this.diff.elapsed = 0
    this.diff.fishSpawnInterval = this.config.enemy_spawn_interval_start_ms / 1000
    this.diff.mineSpawnInterval = this.config.mine_spawn_interval_start_ms / 1000
    this.diff.enemySpeed = this.config.enemy_speed_start
  }

  onPlayerDamaged(): void {
    this.lastDamageTime = this.time
  }

  update(dt: number): void {
    this.time += dt
    this.diff.elapsed += dt

    const rampSec = this.config.difficulty_ramp_seconds
    const rampCount = Math.floor(this.diff.elapsed / rampSec)

    this.diff.fishSpawnInterval = Math.max(
      this.config.enemy_spawn_interval_min_ms / 1000,
      this.config.enemy_spawn_interval_start_ms / 1000 - rampCount * 80 / 1000,
    )
    this.diff.mineSpawnInterval = Math.max(
      this.config.mine_spawn_interval_min_ms / 1000,
      this.config.mine_spawn_interval_start_ms / 1000 - rampCount * 120 / 1000,
    )
    this.diff.enemySpeed = Math.min(
      this.config.enemy_speed_max,
      this.config.enemy_speed_start + rampCount * 8,
    )

    this.timers.fish -= dt
    this.timers.mine -= dt
    this.timers.treasure -= dt
    this.timers.fuel -= dt

    const canSpawnMine = this.time - this.lastDamageTime > 1

    if (this.timers.fish <= 0 && this.fishPool.length < this.config.fish_max_active) {
      this.fishPool.push(spawnFish(this.canvasW, this.config, this.diff))
      this.timers.fish = this.diff.fishSpawnInterval * (0.8 + Math.random() * 0.4)
    }

    if (this.timers.mine <= 0 && this.minePool.length < this.config.mine_max_active && canSpawnMine) {
      this.minePool.push(spawnMine(this.canvasW, this.config))
      this.timers.mine = this.diff.mineSpawnInterval * (0.8 + Math.random() * 0.4)
    }

    if (this.timers.treasure <= 0 && this.treasurePool.length < this.config.treasure_max_active) {
      this.treasurePool.push(spawnTreasure(this.canvasW, this.config))
      this.timers.treasure = this.config.treasure_spawn_interval_ms / 1000 * (0.8 + Math.random() * 0.4)
    }

    const lowFuel = false
    if (this.timers.fuel <= 0 && this.fuelPool.length < this.config.fuel_max_active) {
      this.fuelPool.push(spawnFuelCan(this.canvasW, this.config))
      this.timers.fuel = this.config.fuel_spawn_interval_ms / 1000 * (0.8 + Math.random() * 0.4)
    }

    this.fishPool.forEach(f => { f.x -= this.diff.enemySpeed * dt })
    this.fishPool = this.fishPool.filter(f => f.active && f.x > -80)

    this.minePool.forEach(m => { m.x -= 60 * dt })
    this.minePool = this.minePool.filter(m => m.active && m.x > -80)

    this.treasurePool.forEach(t => { if (!t.collected) t.x -= 50 * dt })
    this.treasurePool = this.treasurePool.filter(t => t.active)

    this.fuelPool.forEach(f => { if (!f.collected) f.x -= 50 * dt })
    this.fuelPool = this.fuelPool.filter(f => f.active)
  }
}

export function intersects(a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}
