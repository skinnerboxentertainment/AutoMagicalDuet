import { Container, Graphics } from "pixi.js"

export class CrtEffects {
  readonly container = new Container()

  constructor(width: number, height: number) {
    const scanlines = new Graphics()
    for (let y = 0; y < height; y += 3) {
      scanlines.rect(0, y, width, 1).fill({ color: 0x000000, alpha: 0.08 })
    }
    this.container.addChild(scanlines)

    const vignette = new Graphics()
    vignette.rect(0, 0, width, height).fill({ color: 0x000000, alpha: 0 })
    const gradStops = [
      { y: 0, a: 0.5 }, { y: height * 0.15, a: 0.15 },
      { y: height * 0.5, a: 0 },
      { y: height * 0.85, a: 0.15 }, { y: height, a: 0.5 },
    ]
    for (let i = 0; i < gradStops.length - 1; i++) {
      const from = gradStops[i]
      const to = gradStops[i + 1]
      for (let y = from.y; y < to.y; y++) {
        const t = (y - from.y) / (to.y - from.y) || 0
        const a = from.a + (to.a - from.a) * t
        if (a > 0.01) {
          vignette.rect(0, y, width, 1).fill({ color: 0x000000, alpha: a })
        }
      }
    }
    this.container.addChild(vignette)
  }
}
