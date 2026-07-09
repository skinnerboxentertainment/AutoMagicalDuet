import { Container, Graphics } from "pixi.js"

export class CrtEffects {
  readonly container = new Container()

  constructor(width: number, height: number) {
    this.container.eventMode = "none"

    const scanlines = new Graphics()
    scanlines.eventMode = "none"
    for (let y = 0; y < height; y += 3) {
      scanlines.rect(0, y, width, 1).fill({ color: 0x000000, alpha: 0.08 })
    }
    this.container.addChild(scanlines)

    const vignette = new Graphics()
    vignette.eventMode = "none"
    const steps = 40
    for (let i = 0; i < steps; i++) {
      const t = i / steps
      const alpha = Math.sin(t * Math.PI) * 0.3
      const bandHeight = height / steps
      vignette.rect(0, i * bandHeight, width, bandHeight + 1).fill({ color: 0x000000, alpha })
    }
    this.container.addChild(vignette)
  }
}
