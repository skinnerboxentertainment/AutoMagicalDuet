import { Container, Graphics, Text } from "pixi.js"
import type { Scene } from "../core/types"
import type { InputManager } from "../core/input-manager"
import type { SubShooterConfig } from "../gameplay/types"
import { Player } from "../gameplay/player"
import { Projectile } from "../gameplay/projectile"
import { FuelManager } from "../gameplay/fuel-manager"
import { SpawnDirector, intersects } from "../gameplay/spawn-director"
import { updateFish } from "../gameplay/enemy"
import { OceanBackground } from "../gameplay/ocean-background"

export class GameScene implements Scene {
  private readonly root = new Container()
  private readonly bg: OceanBackground
  private readonly player: Player
  private readonly fuelManager: FuelManager
  private readonly spawn: SpawnDirector
  private readonly projectiles: Projectile[] = []
  private fireCooldown = 0
  private score = 0
  private gameState: "playing" | "game-over" = "playing"

  private readonly playerGfx = new Graphics()
  private readonly fishGfx = new Map<number, Graphics>()
  private readonly mineGfx = new Map<number, Graphics>()
  private readonly treasureGfx = new Map<number, Graphics>()
  private readonly fuelGfx = new Map<number, Graphics>()
  private readonly projGfx = new Map<number, Graphics>()
  private readonly hudScore: Text
  private readonly hudHp: Text
  private readonly hudFuel: Graphics
  private readonly gameOverText: Text
  private readonly restartText: Text
  private nextId = 0
  private time = 0
  private hasFiredThisPress = false

  constructor(
    private readonly stage: Container,
    private readonly input: InputManager,
    private readonly config: SubShooterConfig,
    private readonly canvasW: number,
    private readonly canvasH: number,
    private readonly onGameOver: (score: number) => void,
  ) {
    this.bg = new OceanBackground(canvasW, canvasH)
    this.root.addChild(this.bg.container)

    this.player = new Player(config, canvasW, canvasH)
    this.fuelManager = new FuelManager(config)
    this.spawn = new SpawnDirector(config, canvasW)

    this.root.addChild(this.playerGfx)

    this.hudScore = new Text({ text: "Score: 0", style: { fill: 0xffffff, fontSize: 18 } })
    this.hudScore.position.set(16, 8)
    this.root.addChild(this.hudScore)

    this.hudHp = new Text({ text: "HP: 3", style: { fill: 0xff4444, fontSize: 18 } })
    this.hudHp.position.set(16, 32)
    this.root.addChild(this.hudHp)

    this.hudFuel = new Graphics()
    this.hudFuel.position.set(300, 12)
    this.root.addChild(this.hudFuel)

    this.gameOverText = new Text({ text: "GAME OVER", style: { fill: 0xff4444, fontSize: 48, fontWeight: "700" } })
    this.gameOverText.anchor.set(0.5)
    this.gameOverText.position.set(canvasW / 2, canvasH / 2 - 30)

    this.restartText = new Text({ text: "Press R to restart", style: { fill: 0x888888, fontSize: 20 } })
    this.restartText.anchor.set(0.5)
    this.restartText.position.set(canvasW / 2, canvasH / 2 + 20)
  }

  enter(): void {
    this.stage.addChild(this.root)
  }

  exit(): void {
    this.stage.removeChild(this.root)
  }

  private restart(): void {
    this.player.reset()
    this.fuelManager.reset()
    this.spawn.reset()
    this.projectiles.length = 0
    this.score = 0
    this.gameState = "playing"
    this.time = 0
    this.fireCooldown = 0
    this.fishGfx.clear()
    this.mineGfx.clear()
    this.treasureGfx.clear()
    this.fuelGfx.clear()
    this.projGfx.clear()
    this.root.removeChildren()
    this.root.addChild(this.bg.container)
    this.root.addChild(this.playerGfx)
    this.root.addChild(this.hudScore)
    this.root.addChild(this.hudHp)
    this.root.addChild(this.hudFuel)
    this.hasFiredThisPress = false
  }

  private gameOver(): void {
    this.gameState = "game-over"
    this.root.addChild(this.gameOverText)
    this.root.addChild(this.restartText)
  }

  update(dt: number): void {
    this.time += dt

    if (this.gameState === "game-over") {
      if (this.input.keysJustPressed.has("KeyR")) {
        this.restart()
      }
      return
    }

    const left = this.input.keys.has("ArrowLeft") || this.input.keys.has("KeyA")
    const right = this.input.keys.has("ArrowRight") || this.input.keys.has("KeyD")
    const up = this.input.keys.has("ArrowUp") || this.input.keys.has("KeyW")
    const down = this.input.keys.has("ArrowDown") || this.input.keys.has("KeyS")
    const fire = this.input.keys.has("Space")

    this.player.update(dt, left, right, up, down)
    this.bg.update(dt, this.config.world_scroll_speed)
    this.spawn.update(dt)

    const fuelDmg = this.fuelManager.update(dt)
    for (let i = 0; i < fuelDmg; i++) {
      this.player.takeDamage()
    }

    this.fireCooldown -= dt
    if (fire && this.fireCooldown <= 0 && this.player.canFire() && this.projectiles.length < this.config.projectile_max_active) {
      this.projectiles.push(new Projectile(this.player.x + this.player.width, this.player.y + this.player.height / 2 - 2, this.config))
      this.fireCooldown = this.config.projectile_cooldown_ms / 1000
    }

    for (const p of this.projectiles) p.update(dt)
    this.pruneInactive(this.projectiles)

    for (const fish of this.spawn.fish) updateFish(fish, dt, this.time)
    for (const mine of this.spawn.mines) { mine.x -= 60 * dt }

    this.handleCollisions()

    if (!this.player.alive) {
      this.gameOver()
    }

    this.draw()
  }

  private handleCollisions(): void {
    const pBounds = this.player.bounds

    for (const fish of this.spawn.fish) {
      if (!fish.active) continue
      const fBounds = { x: fish.x, y: fish.y, width: fish.width, height: fish.height }
      if (intersects(pBounds, fBounds)) {
        if (this.player.takeDamage()) {
          this.spawn.onPlayerDamaged()
        }
      }
      for (const p of this.projectiles) {
        if (!p.active) continue
        if (intersects({ x: p.x, y: p.y, width: p.width, height: p.height }, fBounds)) {
          p.active = false
          fish.active = false
          this.score += this.config.score_per_enemy
        }
      }
    }

    for (const mine of this.spawn.mines) {
      if (!mine.active) continue
      const mBounds = { x: mine.x, y: mine.y, width: mine.width, height: mine.height }
      if (intersects(pBounds, mBounds)) {
        if (this.player.takeDamage()) {
          this.spawn.onPlayerDamaged()
        }
      }
      for (const p of this.projectiles) {
        if (!p.active) continue
        if (intersects({ x: p.x, y: p.y, width: p.width, height: p.height }, mBounds)) {
          p.active = false
          mine.active = false
          this.score += this.config.score_per_enemy
        }
      }
    }

    for (const t of this.spawn.treasures) {
      if (t.collected || !t.active) continue
      if (intersects(pBounds, { x: t.x, y: t.y, width: t.width, height: t.height })) {
        t.collected = true
        this.score += this.config.score_per_treasure
      }
    }

    for (const f of this.spawn.fuelCans) {
      if (f.collected || !f.active) continue
      if (intersects(pBounds, { x: f.x, y: f.y, width: f.width, height: f.height })) {
        f.collected = true
        this.fuelManager.refill()
      }
    }
  }

  private pruneInactive(arr: { active: boolean }[]): void {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!arr[i].active) arr.splice(i, 1)
    }
  }

  private draw(): void {
    this.playerGfx.clear()
    if (this.player.alive) {
      if (!this.player.invincible || Math.floor(this.time * 12) % 2 === 0) {
        this.playerGfx.rect(this.player.x, this.player.y, this.player.width, this.player.height).fill(0x44aaff)
        this.playerGfx.rect(this.player.x + 4, this.player.y - 4, 8, 4).fill(0x888888)
      }
    }

    this.hudScore.text = `Score: ${this.score}`
    this.hudHp.text = `HP: ${this.player.hp}`
    const fuelPct = this.fuelManager.fuel / this.fuelManager.maxFuel
    this.hudFuel.clear()
    this.hudFuel.rect(0, 0, 120, 12).fill(0x333333)
    this.hudFuel.rect(0, 0, 120 * fuelPct, 12).fill(fuelPct < 0.2 ? 0xff4444 : 0x44aaff)
  }
}
