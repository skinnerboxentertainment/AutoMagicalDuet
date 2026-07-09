import { Container } from "pixi.js"
import type { Scene } from "../core/types"
import type { InputManager } from "../core/input-manager"
import type { GameplayConfig } from "../core/config"
import levelData from "../../assets/data/level-01.json"
import gameplayConfig from "../../assets/data/gameplay-config.json"
import { Level, type LevelDefinition } from "../gameplay/level"
import { Player, type PlayerInput, intersects } from "../gameplay/player"
import { PlatformerRenderer, type GameplayTextures } from "../gameplay/renderer"
import { GameplayState } from "../gameplay/state"

export class GameScene implements Scene {
  private readonly level = new Level(levelData as LevelDefinition)
  private readonly player = new Player(this.level.player)
  private readonly state = new GameplayState(this.level.totalGems)
  private readonly renderer: PlatformerRenderer

  constructor(
    private readonly stage: Container,
    private readonly input: InputManager,
    private readonly config: GameplayConfig,
    textures: GameplayTextures,
  ) {
    this.renderer = new PlatformerRenderer(this.level, textures)
  }

  enter(): void {
    this.stage.addChild(this.renderer.root)
    this.restart()
  }

  exit(): void {
    this.stage.removeChild(this.renderer.root)
  }

  update(dt: number): void {
    const input = this.readInput()
    if (input.restart && !this.state.isPlaying) {
      this.restart()
      return
    }
    if (this.state.isPlaying) {
      this.player.update(dt, input, this.level.platforms)
      this.level.enemy.update(dt)
      this.handleGemCollection()
      this.handleHazardsAndExit()
    }
    this.renderer.update(this.player, this.state)
  }

  private restart(): void {
    this.level.reset()
    this.player.reset()
    this.state.reset(this.level.totalGems)
    this.renderer.update(this.player, this.state)
  }

  private handleGemCollection(): void {
    const playerBounds = this.player.getBounds()
    for (const gem of this.level.gems) {
      if (!gem.collected && intersects(playerBounds, gem.getBounds())) {
        this.state.collectGem(gem.collect())
      }
    }
  }

  private handleHazardsAndExit(): void {
    const playerBounds = this.player.getBounds()
    if (intersects(playerBounds, this.level.enemy.getBounds())) {
      this.state.gameOver()
      return
    }
    if (intersects(playerBounds, this.level.exit)) {
      this.state.reachExit(gameplayConfig.exitBonus)
    }
  }

  private readInput(): PlayerInput {
    const keys = this.input.keys
    return {
      left: keys.has("ArrowLeft") || keys.has("KeyA"),
      right: keys.has("ArrowRight") || keys.has("KeyD"),
      jump: keys.has("Space") || keys.has("ArrowUp"),
      restart: keys.has("KeyR"),
    }
  }
}
