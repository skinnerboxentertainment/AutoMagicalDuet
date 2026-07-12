import { Application, Container, Graphics, Text, TextStyle } from "pixi.js"
import type { GameState, HexTile, SageUnit } from "./types"
import { hexDist, getAspectsInRadius } from "./game-logic"
import { key } from "./map-data"

const HEX_SIZE = 32
const COLORS: Record<string, number> = {
  plains: 0x7ec850,
  forest: 0x2d6a1e,
  river: 0x4a90d9,
  hills: 0x8b7355,
  desert: 0xe8d58a,
  mountain: 0x6b6b6b,
  water: 0x2b5f8a,
}
const ASPECT_COLORS: Record<string, number> = {
  water: 0x4a90d9,
  earth: 0x8b5e3c,
  heat: 0xe06030,
  mineral: 0x888888,
  alive: 0x2d6a1e,
  fertile: 0x7ec850,
  metal: 0xc0c0c0,
  sacred: 0xd4a0d4,
  industry: 0x808080,
}

export class HexRenderer {
  private container: Container
  private hexGraphics: Map<string, Graphics> = new Map()
  private aspectTexts: Map<string, Text[]> = new Map()
  private sageGraphics: Map<string, Graphics> = new Map()
  private statusText: Text
  private turnText: Text

  constructor(private app: Application, private getState: () => GameState) {
    this.container = new Container()
    app.stage.addChild(this.container)

    this.statusText = new Text({
      text: "",
      style: new TextStyle({ fontSize: 14, fill: "#ccc", fontFamily: "monospace" }),
    })
    this.statusText.x = 10
    this.statusText.y = app.screen.height - 30
    app.stage.addChild(this.statusText)

    this.turnText = new Text({
      text: "",
      style: new TextStyle({ fontSize: 16, fill: "#fff", fontFamily: "monospace", fontWeight: "bold" }),
    })
    this.turnText.x = app.screen.width - 200
    this.turnText.y = 10
    app.stage.addChild(this.turnText)

    this.buildMap()
  }

  pixelCoords(q: number, r: number): { x: number; y: number; cx: number; cy: number } {
    const x = HEX_SIZE * 1.5 * q + 60
    const y = HEX_SIZE * (Math.sqrt(3) * r + Math.sqrt(3) / 2 * q) + 60
    return { x, y, cx: x, cy: y }
  }

  buildMap(): void {
    const state = this.getState()
    for (const h of state.mapHexes.values()) {
      const { x, y } = this.pixelCoords(h.q, h.r)
      const g = new Graphics()
      this.drawHex(g, x, y, h)
      this.container.addChild(g)
      this.hexGraphics.set(key(h.q, h.r), g)

      const texts: Text[] = []
      for (let i = 0; i < Math.min(h.aspects.length, 3); i++) {
        const a = h.aspects[i]
        const t = new Text({
          text: a.type.substring(0, 3),
          style: new TextStyle({
            fontSize: 9,
            fill: aspectColor(a.type),
            fontFamily: "monospace",
          }),
        })
        t.anchor.set(0.5)
        t.x = x
        t.y = y - 8 + i * 10
        this.container.addChild(t)
        texts.push(t)
      }
      this.aspectTexts.set(key(h.q, h.r), texts)
    }
  }

  private drawHex(g: Graphics, x: number, y: number, h: HexTile): void {
    const color = COLORS[h.terrain] ?? 0x666666
    g.poly(this.hexPoints(x, y, HEX_SIZE - 1), true)
    g.fill({ color })

    if (h.style === "study") {
      g.poly(this.hexPoints(x, y, HEX_SIZE - 1), true)
      g.fill({ color: 0xffff00, alpha: 0.15 })
    }
    if (h.style === "selected") {
      g.poly(this.hexPoints(x, y, HEX_SIZE + 2), false)
      g.stroke({ width: 2, color: 0xffffff })
    }
    if (h.style === "validPair") {
      g.poly(this.hexPoints(x, y, HEX_SIZE), false)
      g.stroke({ width: 2, color: 0x00ffaa })
    }
    g.poly(this.hexPoints(x, y, HEX_SIZE - 1), false)
    g.stroke({ width: 1, color: 0x000000, alpha: 0.3 })
  }

  private hexPoints(cx: number, cy: number, size: number): number[] {
    const pts: number[] = []
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30)
      pts.push(cx + size * Math.cos(angle))
      pts.push(cy + size * Math.sin(angle))
    }
    return pts
  }

  render(): void {
    const state = this.getState()
    this.statusText.text = state.message

    this.turnText.text = `Turn ${state.turn} | Disc: ${state.discoveriesMade.length} | Arcana: ${state.arcana}`

    for (const g of this.sageGraphics.values()) {
      this.container.removeChild(g)
      g.destroy()
    }
    this.sageGraphics.clear()

    for (const sage of state.sages) {
      const { x, y } = this.pixelCoords(sage.q, sage.r)
      const g = new Graphics()
      const color = sage.owner === 0 ? 0x00bbff : 0xff4444
      g.circle(x, y, 12)
      g.fill({ color })
      if (sage.status === "contemplating") {
        g.circle(x, y, 16)
        g.fill({ color: 0xffff00, alpha: 0.3 })
      }
      this.container.addChild(g)
      this.sageGraphics.set(sage.id, g)

      const label = new Text({
        text: sage.id === "sage_player" ? "You" : "Rival",
        style: new TextStyle({ fontSize: 8, fill: "#fff", fontFamily: "monospace" }),
      })
      label.anchor.set(0.5)
      label.x = x
      label.y = y + 18
      this.container.addChild(label)

      if (sage.owner === state.playerSageIndex || true) {
        for (const h of state.mapHexes.values()) {
          const dist = hexDist(h.q, h.r, sage.q, sage.r)
          h.style = "normal"
          if (dist <= sage.studyRadius) {
            h.style = "study"
          }
        }
      }
    }

    for (const [k, h] of state.mapHexes.entries()) {
      const g = this.hexGraphics.get(k)
      if (g) {
        g.clear()
        this.drawHex(g, this.pixelCoords(h.q, h.r).x, this.pixelCoords(h.q, h.r).y, h)
      }
    }
  }

  getHexAtPixel(px: number, py: number): { q: number; r: number } | null {
    const state = this.getState()
    for (const h of state.mapHexes.values()) {
      const { x, y } = this.pixelCoords(h.q, h.r)
      const dx = px - x
      const dy = py - y
      if (dx * dx + dy * dy < HEX_SIZE * HEX_SIZE) {
        return { q: h.q, r: h.r }
      }
    }
    return null
  }

  destroy(): void {
    this.container.removeFromParent()
  }
}

function aspectColor(type: string): string {
  const c = ASPECT_COLORS[type] ?? 0xaaaaaa
  return `#${c.toString(16).padStart(6, "0")}`
}
