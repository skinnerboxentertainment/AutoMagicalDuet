import type { SubShooterConfig } from "./types"

export class FuelManager {
  fuel: number
  readonly maxFuel: number
  readonly drainRate: number
  readonly refillAmount: number
  readonly emptyDamageInterval: number
  readonly lowThreshold: number
  private damageTimer = 0

  constructor(config: SubShooterConfig) {
    this.maxFuel = config.fuel_max
    this.drainRate = config.fuel_drain_per_second
    this.refillAmount = config.fuel_refill_amount
    this.emptyDamageInterval = config.fuel_empty_damage_interval_ms / 1000
    this.lowThreshold = config.fuel_low_threshold
    this.fuel = config.fuel_max
  }

  get isLow(): boolean {
    return this.fuel / this.maxFuel < this.lowThreshold
  }

  get isEmpty(): boolean {
    return this.fuel <= 0
  }

  reset(): void {
    this.fuel = this.maxFuel
    this.damageTimer = 0
  }

  refill(): void {
    this.fuel = Math.min(this.maxFuel, this.fuel + this.refillAmount)
  }

  update(dt: number): number {
    this.fuel = Math.max(0, this.fuel - this.drainRate * dt)
    if (this.isEmpty) {
      this.damageTimer += dt
      if (this.damageTimer >= this.emptyDamageInterval) {
        this.damageTimer = 0
        return 1
      }
    }
    return 0
  }
}
