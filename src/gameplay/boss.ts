import type { BossPart, BossProjectile, SubShooterConfig } from "./types"

export class IronclawBoss {
  x: number
  y: number
  width = 240
  height = 120
  active = true
  phase: 1 | 2 = 1

  parts: BossPart[] = []
  projectiles: BossProjectile[] = []
  private fireTimer = 0
  private phase2FireTimer = 0
  private readonly canvasH: number

  constructor(canvasW: number, canvasH: number) {
    this.x = canvasW + 40
    this.y = canvasH / 2 - 60
    this.canvasH = canvasH
    this.parts = [
      { key: "armor", x: this.x + 10, y: this.y + 10, width: 50, height: 100, hp: 3, maxHp: 3, active: true, destroyed: false },
      { key: "turret-left", x: this.x + 80, y: this.y - 10, width: 30, height: 20, hp: 2, maxHp: 2, active: true, destroyed: false },
      { key: "turret-right", x: this.x + 140, y: this.y - 10, width: 30, height: 20, hp: 2, maxHp: 2, active: true, destroyed: false },
      { key: "core", x: this.x + 100, y: this.y + 30, width: 60, height: 60, hp: 5, maxHp: 5, active: false, destroyed: false },
    ]
  }

  reset(): void {
    this.parts = [
      { key: "armor", x: this.x + 10, y: this.y + 10, width: 50, height: 100, hp: 3, maxHp: 3, active: true, destroyed: false },
      { key: "turret-left", x: this.x + 80, y: this.y - 10, width: 30, height: 20, hp: 2, maxHp: 2, active: true, destroyed: false },
      { key: "turret-right", x: this.x + 140, y: this.y - 10, width: 30, height: 20, hp: 2, maxHp: 2, active: true, destroyed: false },
      { key: "core", x: this.x + 100, y: this.y + 30, width: 60, height: 60, hp: 5, maxHp: 5, active: false, destroyed: false },
    ]
    this.projectiles = []
    this.phase = 1
    this.fireTimer = 0
    this.phase2FireTimer = 0
  }

  slideIn(dt: number): boolean {
    this.x -= 120 * dt
    for (const p of this.parts) p.x -= 120 * dt
    if (this.x <= 600) return true
    return false
  }

  update(dt: number, playerY: number): void {
    if (!this.active) return

    const armorDown = this.getPart("armor")?.destroyed

    if (armorDown && this.phase === 1) {
      this.phase = 2
      this.getPart("core")!.active = true
    }

    const leftTurret = this.getPart("turret-left")
    const rightTurret = this.getPart("turret-right")
    const core = this.getPart("core")

    if (this.phase === 1) {
      this.fireTimer += dt
      const fireInterval = 1.5
      if (this.fireTimer >= fireInterval) {
        this.fireTimer = 0
        if (leftTurret && !leftTurret.destroyed) this.fireProjectile(leftTurret, playerY)
        if (rightTurret && !rightTurret.destroyed) this.fireProjectile(rightTurret, playerY)
      }
    } else {
      this.phase2FireTimer += dt
      const fireInterval = 1.2
      if (this.phase2FireTimer >= fireInterval) {
        this.phase2FireTimer = 0
        if (leftTurret && !leftTurret.destroyed) this.fireProjectile(leftTurret, playerY)
        if (rightTurret && !rightTurret.destroyed) this.fireProjectile(rightTurret, playerY)
      }
    }

    for (const p of this.projectiles) {
      p.x += p.vx * dt
      p.y += p.vy * dt
      if (p.x < -50 || p.x > 900 || p.y < -50 || p.y > this.canvasH + 50) p.active = false
    }
    this.projectiles = this.projectiles.filter(p => p.active)

    if (core?.destroyed) this.active = false
  }

  private fireProjectile(turret: BossPart, playerY: number): void {
    const dx = 0
    const dy = playerY - turret.y
    const len = Math.sqrt(dx * dx + dy * dy) || 1
    const speed = 180
    this.projectiles.push({
      x: turret.x + turret.width, y: turret.y + turret.height / 2,
      vx: speed * (dx / len) + 60, vy: speed * (dy / len),
      active: true, radius: 6,
    })
  }

  getPart(key: string): BossPart | undefined {
    return this.parts.find(p => p.key === key)
  }

  hitPart(key: string): boolean {
    const part = this.getPart(key)
    if (!part || part.destroyed) return false
    part.hp--
    if (part.hp <= 0) {
      part.destroyed = true
      part.active = false
    }
    return true
  }

  getBounds(key: string): { x: number; y: number; width: number; height: number } | null {
    const part = this.getPart(key)
    if (!part || part.destroyed) return null
    return { x: this.x + (part.x - this.x), y: this.y + (part.y - this.y), width: part.width, height: part.height }
  }

  get allDestroyed(): boolean {
    return this.parts.every(p => p.destroyed || p.key === "core")
  }
}
