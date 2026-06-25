import { Application } from "pixi.js"

const app = new Application()

async function init(): Promise<void> {
  await app.init({ resizeTo: window })
  document.body.appendChild(app.canvas)
}

init()
