import { Container, Graphics, Text } from "pixi.js"
import type { Scene } from "../core/types"
import type { InputManager } from "../core/input-manager"
import type { SubShooterConfig, WaveName } from "../gameplay/types"
import { Player } from "../gameplay/player"
import { Projectile as ProjectileEnt } from "../gameplay/projectile"
import { FuelManager } from "../gameplay/fuel-manager"
import { SpawnDirector, intersects } from "../gameplay/spawn-director"
import { IronclawBoss } from "../gameplay/boss"
import { OceanBackground } from "../gameplay/ocean-background"

export interface GameCallbacks {
  onGameOver: (score: number) => void
  onVictory: (score: number) => void
}

export class GameScene implements Scene {
  private readonly root = new Container()
  private readonly world = new Container()
  private readonly fxLayer = new Container()
  private readonly hudLayer = new Container()
  private readonly bg: OceanBackground
  private readonly player: Player
  private readonly fuelManager: FuelManager
  private readonly spawn: SpawnDirector
  private readonly projectiles: ProjectileEnt[] = []
  private boss: IronclawBoss | null = null
  private fireCooldown = 0
  private score = 0
  private gameState: "playing" | "game-over" | "victory" = "playing"
  private currentWave: WaveName = "wave1"
  private waveAnnounceTimer = 0
  private waveAnnounceText = ""
  private bossSlideIn = false
  private bossAnnounceTimer = 0
  private time = 0

  private readonly playerGfx = new Graphics()
  private readonly enemyGfx = new Map<string, Graphics>()
  private readonly hudScore: Text
  private readonly hudHp: Text
  private readonly hudFuel: Graphics
  private readonly hudWave: Text
  private readonly announceText: Text
  private readonly gameOverText: Text
  private readonly restartText: Text
  private readonly victoryText: Text
  private readonly victoryScore: Text
  private readonly victoryRestart: Text
  private gfxSeq = 0

  constructor(
    private readonly stage: Container,
    private readonly input: InputManager,
    private readonly config: SubShooterConfig,
    private readonly canvasW: number,
    private readonly canvasH: number,
    private readonly callbacks: GameCallbacks,
  ) {
    this.bg = new OceanBackground(canvasW, canvasH)
    this.world.addChild(this.bg.container)
    this.world.addChild(this.playerGfx)
    this.root.addChild(this.world)

    this.player = new Player(config, canvasW, canvasH)
    this.fuelManager = new FuelManager(config)
    this.spawn = new SpawnDirector(config, canvasW)

    this.root.addChild(this.fxLayer)
    this.root.addChild(this.hudLayer)

    this.hudScore = new Text({ text: "Score: 0", style: { fill: 0xffffff, fontSize: 18, fontFamily: "monospace" } })
    this.hudScore.position.set(12, 8)
    this.hudLayer.addChild(this.hudScore)

    this.hudHp = new Text({ text: "HP: 3", style: { fill: 0xff6666, fontSize: 18, fontFamily: "monospace" } })
    this.hudHp.position.set(12, 30)
    this.hudLayer.addChild(this.hudHp)

    this.hudFuel = new Graphics()
    this.hudFuel.position.set(300, 12)
    this.hudLayer.addChild(this.hudFuel)

    this.hudWave = new Text({ text: "", style: { fill: 0x88ccff, fontSize: 16, fontFamily: "monospace" } })
    this.hudWave.position.set(620, 8)
    this.hudLayer.addChild(this.hudWave)

    this.announceText = new Text({ text: "", style: { fill: 0xffcc00, fontSize: 36, fontWeight: "700", fontFamily: "monospace" } })
    this.announceText.anchor.set(0.5)
    this.announceText.position.set(canvasW / 2, canvasH / 2 - 40)
    this.fxLayer.addChild(this.announceText)

    this.gameOverText = new Text({ text: "GAME OVER", style: { fill: 0xff4444, fontSize: 48, fontWeight: "700", fontFamily: "monospace" } })
    this.gameOverText.anchor.set(0.5)
    this.gameOverText.position.set(canvasW / 2, canvasH / 2 - 30)
    this.gameOverText.visible = false

    this.restartText = new Text({ text: "Press R to restart", style: { fill: 0x888888, fontSize: 20, fontFamily: "monospace" } })
    this.restartText.anchor.set(0.5)
    this.restartText.position.set(canvasW / 2, canvasH / 2 + 20)
    this.restartText.visible = false

    this.victoryText = new Text({ text: "MISSION COMPLETE", style: { fill: 0x44ff88, fontSize: 40, fontWeight: "700", fontFamily: "monospace" } })
    this.victoryText.anchor.set(0.5)
    this.victoryText.position.set(canvasW / 2, canvasH / 2 - 40)

    this.victoryScore = new Text({ text: "", style: { fill: 0xffffff, fontSize: 24, fontFamily: "monospace" } })
    this.victoryScore.anchor.set(0.5)
    this.victoryScore.position.set(canvasW / 2, canvasH / 2 + 10)

    this.victoryRestart = new Text({ text: "Press R to play again", style: { fill: 0x888888, fontSize: 20, fontFamily: "monospace" } })
    this.victoryRestart.anchor.set(0.5)
    this.victoryRestart.position.set(canvasW / 2, canvasH / 2 + 50)

    this.fxLayer.addChild(this.gameOverText, this.restartText, this.victoryText, this.victoryScore, this.victoryRestart)
  }

  enter(): void { this.stage.addChild(this.root) }
  exit(): void { this.stage.removeChild(this.root) }

  private restart(): void {
    this.player.reset(); this.fuelManager.reset(); this.spawn.reset()
    this.projectiles.length = 0; this.score = 0; this.gameState = "playing"
    this.time = 0; this.fireCooldown = 0
    this.currentWave = "wave1"; this.waveAnnounceTimer = 0; this.waveAnnounceText = ""
    this.boss = null; this.bossSlideIn = false; this.bossAnnounceTimer = 0
    this.gameOverText.visible = false; this.restartText.visible = false
    this.victoryText.visible = false; this.victoryScore.visible = false; this.victoryRestart.visible = false
    this.announceText.text = ""
    this.enemyGfx.clear()
    this.world.removeChildren()
    this.world.addChild(this.bg.container, this.playerGfx)
    this.triggerAnnounce("WAVE 1")
  }

  private triggerAnnounce(text: string): void {
    this.waveAnnounceText = text
    this.waveAnnounceTimer = 2.0
    this.announceText.text = text
  }

  private gameOver(): void {
    this.gameState = "game-over"
    this.gameOverText.visible = true
    this.restartText.visible = true
  }

  private victory(score: number): void {
    this.gameState = "victory"
    this.victoryText.visible = true
    this.victoryScore.text = `Score: ${score}`
    this.victoryScore.visible = true
    this.victoryRestart.visible = true
  }

  update(dt: number): void {
    this.time += dt

    if (this.gameState === "game-over") {
      if (this.input.keysJustPressed.has("KeyR")) this.restart()
      return
    }
    if (this.gameState === "victory") {
      if (this.input.keysJustPressed.has("KeyR")) this.restart()
      return
    }

    if (this.waveAnnounceTimer > 0) {
      this.waveAnnounceTimer -= dt
      if (this.waveAnnounceTimer <= 0) this.announceText.text = ""
    }

    if (this.bossAnnounceTimer > 0) {
      this.bossAnnounceTimer -= dt
      this.announceText.text = this.bossAnnounceTimer > 0 ? "INCOMING" : ""
      if (this.bossAnnounceTimer <= 0) {
        this.bossSlideIn = true
        this.boss = new IronclawBoss(this.canvasW, this.canvasH)
      }
    }

    if (this.boss && this.bossSlideIn) {
      const done = this.boss.slideIn(dt)
      if (done) this.bossSlideIn = false
    }

    const left = this.input.keys.has("ArrowLeft") || this.input.keys.has("KeyA")
    const right = this.input.keys.has("ArrowRight") || this.input.keys.has("KeyD")
    const up = this.input.keys.has("ArrowUp") || this.input.keys.has("KeyW")
    const down = this.input.keys.has("ArrowDown") || this.input.keys.has("KeyS")
    const fire = this.input.keys.has("Space")

    this.player.update(dt, left, right, up, down)

    if (this.spawn.currentWave !== "boss") {
      this.bg.update(dt, this.config.world_scroll_speed)
    }

    const fuelLow = this.fuelManager.isLow
    const waveEvent = this.spawn.update(dt, fuelLow)

    if (waveEvent === "wave2") this.triggerAnnounce("WAVE 2")
    else if (waveEvent === "wave3") this.triggerAnnounce("WAVE 3")
    else if (waveEvent === "boss") {
      this.bossAnnounceTimer = 2.0
      this.announceText.text = "INCOMING"
    }

    const fuelDmg = this.fuelManager.update(dt)
    for (let i = 0; i < fuelDmg; i++) this.player.takeDamage()

    this.fireCooldown -= dt
    if (fire && this.fireCooldown <= 0 && this.player.canFire() && this.projectiles.length < this.config.projectile_max_active) {
      this.projectiles.push(new ProjectileEnt(this.player.x + this.player.width, this.player.y + this.player.height / 2 - 2, this.config))
      this.fireCooldown = this.config.projectile_cooldown_ms / 1000
    }

    const bossActive = this.boss && this.boss.active

    if (!bossActive) {
      for (const p of this.projectiles) p.update(dt)
      this.prune(this.projectiles)
    }

    this.handleCollisions(dt)

    if (bossActive && this.boss && this.bossSlideIn === false) {
      this.boss.update(dt, this.player.y + this.player.height / 2)
    }

    if (this.boss && !this.boss.active && this.bossSlideIn === false) {
      this.victory(this.score)
    }

    if (!this.player.alive) this.gameOver()

    this.draw()
  }

  private handleCollisions(dt: number): void {
    const pb = this.player.bounds

    for (const f of this.spawn.fish) {
      if (!f.active) continue
      const fb = { x: f.x, y: f.y - Math.sin(this.time * 3 + (f as any).wobblePhase || 0) * 0, width: f.width, height: f.height }
      if (intersects(pb, fb)) { if (this.player.takeDamage()) this.spawn.onPlayerDamaged() }
      for (const p of this.projectiles) {
        if (!p.active) continue
        if (intersects({ x: p.x, y: p.y, width: p.width, height: p.height }, fb)) { p.active = false; f.active = false; this.score += this.config.score_per_enemy }
      }
    }

    for (const a of this.spawn.armored) {
      if (!a.active) continue
      const ab = { x: a.x, y: a.y, width: a.width, height: a.height }
      if (intersects(pb, ab)) { if (this.player.takeDamage()) this.spawn.onPlayerDamaged() }
      for (const p of this.projectiles) {
        if (!p.active) continue
        if (intersects({ x: p.x, y: p.y, width: p.width, height: p.height }, ab)) {
          p.active = false; a.hp--
          if (a.hp <= 0) { a.active = false; this.score += this.config.score_per_armored }
        }
      }
    }

    for (const m of this.spawn.mines) {
      if (!m.active) continue
      const mb = { x: m.x, y: m.y, width: m.width, height: m.height }
      if (intersects(pb, mb)) { if (this.player.takeDamage()) this.spawn.onPlayerDamaged() }
      for (const p of this.projectiles) {
        if (!p.active) continue
        if (intersects({ x: p.x, y: p.y, width: p.width, height: p.height }, mb)) { p.active = false; m.active = false; this.score += this.config.score_per_enemy }
      }
    }

    for (const t of this.spawn.treasures) {
      if (t.collected || !t.active) continue
      if (intersects(pb, { x: t.x, y: t.y, width: t.width, height: t.height })) { t.collected = true; this.score += this.config.score_per_treasure }
    }

    for (const f of this.spawn.fuelCans) {
      if (f.collected || !f.active) continue
      if (intersects(pb, { x: f.x, y: f.y, width: f.width, height: f.height })) { f.collected = true; this.fuelManager.refill() }
    }

    if (this.boss && this.boss.active && this.bossSlideIn === false) {
      for (const part of this.boss.parts) {
        if (part.destroyed) continue
        const bb = this.boss.getBounds(part.key)
        if (!bb) continue
        if (intersects(pb, bb)) { if (this.player.takeDamage()) this.spawn.onPlayerDamaged() }
        for (const p of this.projectiles) {
          if (!p.active) continue
          if (intersects({ x: p.x, y: p.y, width: p.width, height: p.height }, bb)) {
            p.active = false
            this.boss.hitPart(part.key)
          }
        }
      }

      for (const bp of this.boss.projectiles) {
        if (!bp.active) continue
        if (intersects(pb, { x: bp.x - bp.radius, y: bp.y - bp.radius, width: bp.radius * 2, height: bp.radius * 2 })) {
          bp.active = false
          if (this.player.takeDamage()) this.spawn.onPlayerDamaged()
        }
      }
    }
  }

  private prune(arr: { active: boolean }[]): void {
    for (let i = arr.length - 1; i >= 0; i--) { if (!arr[i].active) arr.splice(i, 1) }
  }

  private draw(): void {
    this.playerGfx.clear()
    if (this.player.alive) {
      const vis = !this.player.invincible || Math.floor(this.time * 12) % 2 === 0
      if (vis) {
        this.playerGfx.rect(this.player.x, this.player.y, this.player.width, this.player.height).fill(0x44aaff)
        this.playerGfx.rect(this.player.x + 4, this.player.y - 4, 8, 4).fill(0x888888)
      }
    }

    this.hudScore.text = `Score: ${this.score}`
    this.hudHp.text = `HP: ${"■".repeat(this.player.hp)}${"□".repeat(this.player.maxHp - this.player.hp)}`
    const fp = this.fuelManager.fuel / this.fuelManager.maxFuel
    this.hudFuel.clear()
    this.hudFuel.rect(0, 0, 120, 12).fill(0x333333)
    this.hudFuel.rect(0, 0, 120 * fp, 12).fill(fp < 0.2 ? 0xff4444 : 0x44aaff)
    this.hudWave.text = this.spawn.currentWave === "boss" ? "BOSS" : `WAVE ${this.spawn.currentWave.slice(-1)}`
  }
}
