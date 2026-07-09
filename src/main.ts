import { Application } from "pixi.js"
import { loadConfig } from "./core/config"
import { InputManager } from "./core/input-manager"
import { SceneManager } from "./core/scene-manager"
import { GameScene } from "./scenes/game-scene"

const app = new Application()

async function init(): Promise<void> {
  await app.init({ resizeTo: window, background: 0x76c7e8 })
  document.body.appendChild(app.canvas)
  const config = await loadConfig()
  const input = new InputManager()
  const scenes = new SceneManager(app.stage)
  scenes.push(new GameScene(app.stage, input, config))
  app.ticker.add(() => {
    input.update()
    scenes.update(0.016)
  })
}

init().catch((error: unknown) => {
  console.error("Failed to start game", error)
})
