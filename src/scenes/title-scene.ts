import { Text, Container } from "pixi.js"
import type { Scene } from "../core/types"
import type { InputManager } from "../core/input-manager"

export class TitleScene implements Scene {
  private readonly root = new Container()
  private readonly title: Text
  private readonly prompt: Text
  private ready = false

  constructor(
    private readonly stage: Container,
    private readonly input: InputManager,
    private readonly onStart: () => void,
  ) {
    this.title = new Text({ text: "SUB SHOOTER", style: { fill: 0x00bfff, fontSize: 48, fontWeight: "700" } })
    this.title.anchor.set(0.5)
    this.title.position.set(400, 200)
    this.root.addChild(this.title)

    this.prompt = new Text({ text: "Press SPACE to start", style: { fill: 0x888888, fontSize: 20 } })
    this.prompt.anchor.set(0.5)
    this.prompt.position.set(400, 300)
    this.root.addChild(this.prompt)
  }

  enter(): void {
    this.ready = false
    setTimeout(() => { this.ready = true }, 300)
    this.stage.addChild(this.root)
  }

  update(_dt: number): void {
    if (!this.ready) return
    if (this.input.keysJustPressed.has("Space")) {
      this.onStart()
    }
  }

  exit(): void {
    this.stage.removeChild(this.root)
  }
}
