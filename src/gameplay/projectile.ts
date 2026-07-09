import type { ProjectileEnt as ProjectileType, SubShooterConfig } from "./types"

export class Projectile implements ProjectileType {
  x: number
  y: number
  width = 8
  height = 4
  active = true
  speed: number
  lifetime: number

  constructor(x: number, y: number, config: SubShooterConfig) {
    this.x = x
    this.y = y
    this.speed = config.projectile_speed
    this.lifetime = config.projectile_lifetime_ms / 1000
  }

  get bounds() {
    return { x: this.x, y: this.y, width: this.width, height: this.height }
  }

  update(dt: number): void {
    if (!this.active) return
    this.x += this.speed * dt
    this.lifetime -= dt
    if (this.lifetime <= 0) this.active = false
  }
}
