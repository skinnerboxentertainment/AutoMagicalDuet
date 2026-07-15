import { Application } from "pixi.js"
import { InputManager } from "./core/input-manager"
import { JumpScene } from "./gameplay/jump-scene"

let app: Application | null = null
let input: InputManager | null = null
let scene: JumpScene | null = null

export async function launchGame(): Promise<void> {
  const container = document.getElementById("game-container")
  const target = document.getElementById("game-canvas-target")
  const encyclopedia = document.getElementById("encyclopedia")
  if (!container || !target) return

  container.classList.remove("hidden")
  if (encyclopedia) encyclopedia.classList.add("hidden")

  if (app) return

  await JumpScene.preload()

  const w = window.innerWidth
  const h = window.innerHeight

  app = new Application()
  await app.init({
    width: w,
    height: h,
    background: 0x0d0d1a,
    antialias: true,
    autoDensity: true,
    resolution: Math.min(2, window.devicePixelRatio || 1),
  })
  target.innerHTML = ""
  target.appendChild(app.canvas)

  const onResize = () => {
    const nw = window.innerWidth
    const nh = window.innerHeight
    app!.renderer.resize(nw, nh)
    if (scene) scene.resize(nw, nh)
  }
  window.addEventListener("resize", onResize)

  input = new InputManager()

  app.ticker.maxFPS = 60
  app.ticker.add(() => {
    if (!input) return
    input.update()
    if (scene) {
      scene.update(app!.ticker.deltaMS / 1000)
    }
  })

  scene = new JumpScene(app, input, w, h)
}

function closeGame() {
  if (app) {
    if (scene) scene.destroy()
    if (input) input.destroy()
    app.destroy({ removeView: true })
    app = null
    input = null
    scene = null
  }
  const container = document.getElementById("game-container")
  const encyclopedia = document.getElementById("encyclopedia")
  if (container) container.classList.add("hidden")
  if (encyclopedia) encyclopedia.classList.remove("hidden")
}

declare global {
  interface Window {
    launchGame: () => void
    closeGame: () => void
  }
}

window.launchGame = launchGame
window.closeGame = closeGame
