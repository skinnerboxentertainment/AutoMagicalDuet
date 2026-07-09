import { Container, Text } from "pixi.js"
import type { Scene } from "../core/types"
import type { InputManager } from "../core/input-manager"

export class GameOverScene implements Scene {
  private readonly root = new Container()
  private ready = false

  constructor(
    private readonly stage: Container,
    private readonly input: InputManager,
    private readonly score: number,
    private readonly onRestart: () => void,
  ) {
    const title = new Text({ text: "GAME OVER", style: { fill: 0xff4444, fontSize: 48, fontWeight: "700" } })
    title.anchor.set(0.5)
    title.position.set(400, 180)
    this.root.addChild(title)

    const scoreText = new Text({ text: `Score: ${score}`, style: { fill: 0xffffff, fontSize: 28 } })
    scoreText.anchor.set(0.5)
    scoreText.position.set(400, 260)
    this.root.addChild(scoreText)

    const prompt = new Text({ text: "Press R to restart", style: { fill: 0x888888, fontSize: 20 } })
    prompt.anchor.set(0.5)
    prompt.position.set(400, 320)
    this.root.addChild(prompt)
  }

  enter(): void {
    this.ready = false
    setTimeout(() => { this.ready = true }, 300)
    this.stage.addChild(this.root)
  }

  update(_dt: number): void {
    if (!this.ready) return
    if (this.input.keysJustPressed.has("KeyR")) {
      this.onRestart()
    }
  }

  exit(): void {
    this.stage.removeChild(this.root)
  }
}
