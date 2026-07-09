import { Application } from "pixi.js"
import type { SubShooterConfig } from "./gameplay/types"
import { InputManager } from "./core/input-manager"
import { SceneManager } from "./core/scene-manager"
import { TitleScene } from "./scenes/title-scene"
import { GameScene } from "./scenes/game-scene"

const app = new Application()
const CONFIG_URL = "assets/data/gameplay-config.json"

async function loadConfig(): Promise<SubShooterConfig> {
  try {
    const resp = await fetch(CONFIG_URL)
    return await resp.json()
  } catch {
    return {
      player_max_speed: 260, player_acceleration: 1400, player_drag: 1800,
      player_max_hp: 3, player_invincibility_ms: 1200,
      projectile_speed: 520, projectile_cooldown_ms: 260, projectile_lifetime_ms: 1200, projectile_max_active: 4,
      fuel_max: 60, fuel_drain_per_second: 1, fuel_refill_amount: 20,
      fuel_empty_damage_interval_ms: 3000, fuel_low_threshold: 0.2,
      score_per_treasure: 100, score_per_enemy: 50, score_per_armored: 100, score_per_boss: 500,
      spawn_y_min: 80, spawn_y_max: 520,
      fish_max_active: 4, armored_max_active: 2, mine_max_active: 3,
      treasure_max_active: 3, fuel_max_active: 1,
      enemy_spawn_interval_start_ms: 1600, enemy_spawn_interval_min_ms: 800,
      mine_spawn_interval_start_ms: 3500, mine_spawn_interval_min_ms: 1800,
      treasure_spawn_interval_ms: 2400, fuel_spawn_interval_ms: 8000,
      enemy_speed_start: 120, enemy_speed_max: 220,
      world_scroll_speed: 90, difficulty_ramp_seconds: 20,
      wave1_duration: 40, wave2_duration: 50, wave3_duration: 60,
    }
  }
}

async function init(): Promise<void> {
  await app.init({ width: 800, height: 600, background: 0x0d2b45 })
  const target = document.getElementById("game-canvas-target") || document.body
  target.appendChild(app.canvas)
  app.canvas.style.width = "1600px"
  app.canvas.style.height = "1200px"
  app.canvas.style.display = "block"
  app.canvas.style.imageRendering = "pixelated"

  const config = await loadConfig()
  const input = new InputManager()
  const scenes = new SceneManager(app.stage)
  const W = 800
  const H = 600

  function showTitle() {
    scenes.push(new TitleScene(app.stage, input, () => {
      scenes.pop()
      const game = new GameScene(app.stage, input, config, W, H, {
        onGameOver: () => {
          scenes.pop()
          showTitle()
        },
        onVictory: () => {
        },
      })
      scenes.push(game)
    }))
  }

  showTitle()

  app.ticker.add(() => {
    input.update()
    scenes.update(0.016)
  })
}

init().catch((error: unknown) => {
  console.error("Failed to start game", error)
})
