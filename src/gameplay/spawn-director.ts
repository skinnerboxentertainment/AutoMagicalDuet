import type { SubShooterConfig, Fish, Mine, Treasure, FuelCan, ArmoredFish, SpawnTimers, WaveName } from "./types"
import { spawnFish, spawnArmoredFish, spawnMine, spawnTreasure, spawnFuelCan, getWaveSpawnIntervals, getWaveDuration, nextWave } from "./enemy"

export class SpawnDirector {
  private timers: SpawnTimers
  private time = 0
  private waveTime = 0
  private lastDamageTime = -999
  private fishPool: Fish[] = []
  private armoredPool: ArmoredFish[] = []
  private minePool: Mine[] = []
  private treasurePool: Treasure[] = []
  private fuelPool: FuelCan[] = []

  currentWave: WaveName = "wave1"
  waveComplete = false
  bossTriggered = false

  constructor(private readonly config: SubShooterConfig, private readonly canvasW: number) {
    this.timers = { fish: 0, mine: 0, treasure: 0, fuel: 0, armored: 0 }
  }

  get fish(): Fish[] { return this.fishPool }
  get armored(): ArmoredFish[] { return this.armoredPool }
  get mines(): Mine[] { return this.minePool }
  get treasures(): Treasure[] { return this.treasurePool }
  get fuelCans(): FuelCan[] { return this.fuelPool }

  reset(): void {
    this.fishPool = []; this.armoredPool = []; this.minePool = []; this.treasurePool = []; this.fuelPool = []
    this.time = 0; this.waveTime = 0
    this.timers = { fish: 0, mine: 0, treasure: 0, fuel: 0, armored: 0 }
    this.currentWave = "wave1"; this.waveComplete = false; this.bossTriggered = false
  }

  onPlayerDamaged(): void { this.lastDamageTime = this.time }

  update(dt: number, fuelLow: boolean): WaveName | null {
    this.time += dt
    this.waveTime += dt

    const intervals = getWaveSpawnIntervals(this.currentWave, this.waveTime, this.config)
    const waveDur = getWaveDuration(this.currentWave, this.config)

    if (this.currentWave !== "boss" && this.waveTime >= waveDur) {
      const next = nextWave(this.currentWave)
      if (next === "boss") {
        this.bossTriggered = true
        this.currentWave = "boss"
        this.waveTime = 0
        this.clearAll()
        return "boss"
      } else if (next) {
        this.currentWave = next
        this.waveTime = 0
        this.clearAll()
        return this.currentWave
      }
    }

    if (this.currentWave === "boss") return null

    this.timers.fish -= dt; this.timers.mine -= dt; this.timers.treasure -= dt; this.timers.fuel -= dt
    if (intervals.armoredInterval !== null) this.timers.armored -= dt

    const canSpawnMine = this.time - this.lastDamageTime > 1

    if (this.timers.fish <= 0 && this.fishPool.length < this.config.fish_max_active) {
      this.fishPool.push(spawnFish(this.canvasW, this.config.spawn_y_min, this.config.spawn_y_max, intervals.fishSpeed))
      this.timers.fish = intervals.fishInterval * (0.8 + Math.random() * 0.4)
    }

    if (this.timers.mine <= 0 && this.minePool.length < this.config.mine_max_active && canSpawnMine) {
      this.minePool.push(spawnMine(this.canvasW, this.config.spawn_y_min, this.config.spawn_y_max))
      this.timers.mine = intervals.mineInterval * (0.8 + Math.random() * 0.4)
    }

    if (this.timers.treasure <= 0 && this.treasurePool.length < this.config.treasure_max_active) {
      this.treasurePool.push(spawnTreasure(this.canvasW, this.config.spawn_y_min, this.config.spawn_y_max))
      this.timers.treasure = intervals.treasureInterval * (0.8 + Math.random() * 0.4)
    }

    if (this.timers.fuel <= 0 && this.fuelPool.length < this.config.fuel_max_active) {
      this.fuelPool.push(spawnFuelCan(this.canvasW, this.config.spawn_y_min, this.config.spawn_y_max))
      this.timers.fuel = intervals.fuelInterval * (0.8 + Math.random() * 0.4)
    }

    if (intervals.armoredInterval !== null && this.timers.armored !== null) {
      if (this.timers.armored! <= 0 && this.armoredPool.length < this.config.armored_max_active) {
        this.armoredPool.push(spawnArmoredFish(this.canvasW, this.config.spawn_y_min, this.config.spawn_y_max, intervals.fishSpeed))
        this.timers.armored = intervals.armoredInterval * (0.8 + Math.random() * 0.4)
      }
    }

    this.fishPool.forEach(f => { f.x -= intervals.fishSpeed * dt; f.y = f.y })
    this.fishPool = this.fishPool.filter(f => f.active && f.x > -80)
    this.armoredPool.forEach(a => { a.x -= intervals.fishSpeed * dt })
    this.armoredPool = this.armoredPool.filter(a => a.active && a.x > -80)
    this.minePool.forEach(m => { m.x -= 60 * dt })
    this.minePool = this.minePool.filter(m => m.active && m.x > -80)
    this.treasurePool.forEach(t => { if (!t.collected) t.x -= 50 * dt })
    this.treasurePool = this.treasurePool.filter(t => t.active)
    this.fuelPool.forEach(f => { if (!f.collected) f.x -= 50 * dt })
    this.fuelPool = this.fuelPool.filter(f => f.active)

    return null
  }

  private clearAll(): void {
    this.fishPool = []; this.armoredPool = []; this.minePool = []; this.treasurePool = []; this.fuelPool = []
    this.timers = { fish: 0, mine: 0, treasure: 0, fuel: 0, armored: 0 }
  }
}

export function intersects(a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}
