import type { SubShooterConfig } from "./types"

export class Player {
  x: number
  y: number
  width = 64
  height = 32
  vx = 0
  vy = 0
  hp: number
  invincibleUntil = 0
  alive = true

  private readonly maxSpeed: number
  private readonly accel: number
  private readonly drag: number
  private readonly invincMs: number
  readonly maxHp: number
  private readonly minX: number
  private readonly minY: number
  private readonly maxX: number
  private readonly maxY: number

  constructor(config: SubShooterConfig, canvasW: number, canvasH: number) {
    this.x = 80
    this.y = canvasH / 2
    this.maxSpeed = config.player_max_speed
    this.accel = config.player_acceleration
    this.drag = config.player_drag
    this.hp = config.player_max_hp
    this.maxHp = config.player_max_hp
    this.invincMs = config.player_invincibility_ms
    this.minX = 40
    this.minY = config.spawn_y_min
    this.maxX = canvasW * 0.3
    this.maxY = config.spawn_y_max - this.height
  }

  get invincible(): boolean {
    return performance.now() < this.invincibleUntil
  }

  get bounds() {
    return { x: this.x, y: this.y, width: this.width, height: this.height }
  }

  reset(): void {
    this.hp = this.maxHp
    this.alive = true
    this.invincibleUntil = 0
    this.vx = 0
    this.vy = 0
  }

  update(dt: number, left: boolean, right: boolean, up: boolean, down: boolean): void {
    if (!this.alive) return

    if (left) this.vx -= this.accel * dt
    if (right) this.vx += this.accel * dt
    if (up) this.vy -= this.accel * dt
    if (down) this.vy += this.accel * dt

    if (!left && !right) {
      if (this.vx > 0) this.vx = Math.max(0, this.vx - this.drag * dt)
      else if (this.vx < 0) this.vx = Math.min(0, this.vx + this.drag * dt)
    }
    if (!up && !down) {
      if (this.vy > 0) this.vy = Math.max(0, this.vy - this.drag * dt)
      else if (this.vy < 0) this.vy = Math.min(0, this.vy + this.drag * dt)
    }

    this.vx = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.vx))
    this.vy = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.vy))

    this.x += this.vx * dt
    this.y += this.vy * dt

    this.x = Math.max(this.minX, Math.min(this.maxX, this.x))
    this.y = Math.max(this.minY, Math.min(this.maxY, this.y))
  }

  takeDamage(): boolean {
    if (this.invincible || !this.alive) return false
    this.hp--
    this.invincibleUntil = performance.now() + this.invincMs
    if (this.hp <= 0) this.alive = false
    return true
  }

  canFire(): boolean {
    return this.alive
  }
}
