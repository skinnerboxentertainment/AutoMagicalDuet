import { Application, Assets, type Texture } from "pixi.js"
import { loadConfig } from "./core/config"
import { InputManager } from "./core/input-manager"
import { SceneManager } from "./core/scene-manager"
import { BootScene } from "./scenes/boot-scene"
import { GameScene } from "./scenes/game-scene"
import type { GameplayTextures } from "./gameplay/renderer"

const app = new Application()

async function init(): Promise<void> {
  await app.init({ resizeTo: window, background: 0x76c7e8 })
  document.body.appendChild(app.canvas)
  const config = await loadConfig()
  const input = new InputManager()
  const scenes = new SceneManager(app.stage)
  scenes.push(
    new BootScene(() => {
      scenes.replace(new GameScene(app.stage, input, config, getGameplayTextures()))
    }),
  )
  app.ticker.add(() => {
    input.update()
    scenes.update(0.016)
  })
}

function getGameplayTextures(): GameplayTextures {
  return {
    player: Assets.get<Texture>("player"),
    platform: Assets.get<Texture>("platform"),
    gem: Assets.get<Texture>("gem"),
    enemy: Assets.get<Texture>("enemy"),
    exit: Assets.get<Texture>("exit"),
    background: Assets.get<Texture>("background"),
  }
}

init().catch((error: unknown) => {
  console.error("Failed to start game", error)
})
