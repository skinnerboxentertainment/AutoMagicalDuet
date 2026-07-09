import { Graphics, Container } from "pixi.js"

export class OceanBackground {
  readonly container = new Container()
  private scrollX = 0

  constructor(width: number, height: number) {
    const sky = new Graphics()
    sky.rect(0, 0, width, 36).fill(0x1a3a5c)
    this.container.addChild(sky)

    const water = new Graphics()
    water.rect(0, 36, width, height - 36).fill(0x0d2b45)
    this.container.addChild(water)

    const seabed = new Graphics()
    seabed.rect(0, height - 30, width, 30).fill(0x4a3728)
    this.container.addChild(seabed)

    for (let i = 0; i < 20; i++) {
      const bubble = new Graphics()
      const bx = Math.random() * width
      const by = 40 + Math.random() * (height - 80)
      const r = 1 + Math.random() * 3
      bubble.circle(bx, by, r).fill({ color: 0xffffff, alpha: 0.1 + Math.random() * 0.2 })
      this.container.addChild(bubble)
    }
  }

  update(dt: number, speed: number): void {
    this.scrollX += speed * dt
  }
}
