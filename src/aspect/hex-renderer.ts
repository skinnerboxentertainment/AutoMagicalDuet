import { Application, Container, Graphics, Text, TextStyle } from "pixi.js"
import type { GameState, HexTile } from "./types"
import { hexDist, ARCANA_REVEAL_COST } from "./game-logic"
import { DISCOVERIES } from "./discovery-pool"
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
const ASPECT_COLOR_MAP: Record<string, number> = {
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

const END_TURN_BTN = { x: 0, y: 0, w: 100, h: 34 }
const REVEAL_BTN = { x: 0, y: 0, w: 120, h: 34 }
const RESTART_BTN = { x: 0, y: 0, w: 140, h: 40 }

export class HexRenderer {
  private container: Container
  private overlay: Container
  private uiLayer: Container
  private hexGraphics: Map<string, Graphics> = new Map()
  private overlayChildren: Graphics[] = []
  private overlayLabels: Text[] = []
  private statusText: Text
  private turnText: Text
  private endTurnText: Text
  private endTurnBg: Graphics
  private revealText: Text | null = null
  private revealBg: Graphics | null = null
  private _hoverGraphic: Graphics
  private _aspectLabels: Map<string, Graphics[]> = new Map()
  private _aspectTexts: Map<string, Text[]> = new Map()
  private _tutorialStep = 1

  constructor(private app: Application, private getState: () => GameState) {
    this.container = new Container()
    this.overlay = new Container()
    this.uiLayer = new Container()
    app.stage.addChild(this.container)
    app.stage.addChild(this.overlay)
    app.stage.addChild(this.uiLayer)

    this._hoverGraphic = new Graphics()
    app.stage.addChild(this._hoverGraphic)

    const barBg = new Graphics()
    barBg.rect(0, app.screen.height - 50, app.screen.width, 50)
    barBg.fill({ color: 0x0a0a16, alpha: 0.92 })
    barBg.rect(0, app.screen.height - 50, app.screen.width, 1)
    barBg.stroke({ width: 1, color: 0x2a2a3e })
    app.stage.addChild(barBg)

    END_TURN_BTN.x = app.screen.width - 116
    END_TURN_BTN.y = app.screen.height - 42

    REVEAL_BTN.x = END_TURN_BTN.x - 130
    REVEAL_BTN.y = app.screen.height - 42

    this.endTurnBg = new Graphics()
    this.endTurnBg.rect(END_TURN_BTN.x, END_TURN_BTN.y, END_TURN_BTN.w, END_TURN_BTN.h)
    this.endTurnBg.fill({ color: 0x3a6b3a })
    this.endTurnBg.rect(END_TURN_BTN.x, END_TURN_BTN.y, END_TURN_BTN.w, END_TURN_BTN.h)
    this.endTurnBg.stroke({ width: 1, color: 0x5a9b5a })
    app.stage.addChild(this.endTurnBg)

    this.endTurnText = new Text({
      text: "End Turn [E]",
      style: new TextStyle({ fontSize: 12, fill: "#fff", fontFamily: "monospace", fontWeight: "bold" }),
    })
    this.endTurnText.anchor.set(0.5)
    this.endTurnText.x = END_TURN_BTN.x + END_TURN_BTN.w / 2
    this.endTurnText.y = END_TURN_BTN.y + END_TURN_BTN.h / 2
    app.stage.addChild(this.endTurnText)

    this.revealBg = new Graphics()
    this.revealBg.rect(REVEAL_BTN.x, REVEAL_BTN.y, REVEAL_BTN.w, REVEAL_BTN.h)
    this.revealBg.fill({ color: 0x5a3a8a })
    this.revealBg.rect(REVEAL_BTN.x, REVEAL_BTN.y, REVEAL_BTN.w, REVEAL_BTN.h)
    this.revealBg.stroke({ width: 1, color: 0x8a5aba })
    app.stage.addChild(this.revealBg)

    this.revealText = new Text({
      text: `Reveal [${ARCANA_REVEAL_COST}]`,
      style: new TextStyle({ fontSize: 11, fill: "#fff", fontFamily: "monospace", fontWeight: "bold" }),
    })
    this.revealText.anchor.set(0.5)
    this.revealText.x = REVEAL_BTN.x + REVEAL_BTN.w / 2
    this.revealText.y = REVEAL_BTN.y + REVEAL_BTN.h / 2
    app.stage.addChild(this.revealText)

    this.statusText = new Text({
      text: "",
      style: new TextStyle({ fontSize: 13, fill: "#ccc", fontFamily: "monospace" }),
    })
    this.statusText.x = 16
    this.statusText.y = app.screen.height - 34
    app.stage.addChild(this.statusText)

    this.turnText = new Text({
      text: "",
      style: new TextStyle({ fontSize: 15, fill: "#fff", fontFamily: "monospace", fontWeight: "bold" }),
    })
    this.turnText.x = 10
    this.turnText.y = 10
    app.stage.addChild(this.turnText)

    this.buildLegend()
    this.buildMap()
  }

  updateHover(px: number, py: number): void {
    const hex = this.getHexAtPixel(px, py)
    this._hoverGraphic.clear()
    if (hex) {
      const { x, y } = this.pixelCoords(hex.q, hex.r)
      this._hoverGraphic.poly(this.hexPoints(x, y, HEX_SIZE + 1), false)
      this._hoverGraphic.stroke({ width: 2, color: 0xffffff, alpha: 0.5 })
    }
  }

  isEndTurnHit(px: number, py: number): boolean {
    return (
      px >= END_TURN_BTN.x &&
      px <= END_TURN_BTN.x + END_TURN_BTN.w &&
      py >= END_TURN_BTN.y &&
      py <= END_TURN_BTN.y + END_TURN_BTN.h
    )
  }

  isRevealHit(px: number, py: number): boolean {
    return (
      px >= REVEAL_BTN.x &&
      px <= REVEAL_BTN.x + REVEAL_BTN.w &&
      py >= REVEAL_BTN.y &&
      py <= REVEAL_BTN.y + REVEAL_BTN.h
    )
  }

  isRestartHit(px: number, py: number): boolean {
    if (this.getState().winner === null) return false
    return (
      px >= RESTART_BTN.x &&
      px <= RESTART_BTN.x + RESTART_BTN.w &&
      py >= RESTART_BTN.y &&
      py <= RESTART_BTN.y + RESTART_BTN.h
    )
  }

  pixelCoords(q: number, r: number): { x: number; y: number } {
    const COLS = 12
    const ROWS = 12
    const SQRT3 = Math.sqrt(3)
    const gridW = SQRT3 * HEX_SIZE * (COLS + 0.5) + HEX_SIZE * 2
    const gridH = 1.5 * HEX_SIZE * (ROWS + 1) + HEX_SIZE * 2
    const ox = (this.app.screen.width - gridW) / 2
    const oy = (this.app.screen.height - gridH) / 2
    const x = SQRT3 * HEX_SIZE * (q + r / 2) + ox + HEX_SIZE * SQRT3
    const y = 1.5 * HEX_SIZE * r + oy + HEX_SIZE * 1.5
    return { x, y }
  }

  private buildMap(): void {
    const state = this.getState()
    for (const h of state.mapHexes.values()) {
      const { x, y } = this.pixelCoords(h.q, h.r)
      const g = new Graphics()
      this.drawHexShape(g, x, y, HEX_SIZE - 1, h.terrain, "normal")
      this.container.addChild(g)
      this.hexGraphics.set(key(h.q, h.r), g)

      const labelGraphics: Graphics[] = []
      const labelTexts: Text[] = []
      for (let i = 0; i < Math.min(h.aspects.length, 3); i++) {
        const a = h.aspects[i]
        const label = a.type === "alive" ? "life" : a.type === "fertile" ? "grow" : a.type.substring(0, 4)
        const t = new Text({
          text: label,
          style: new TextStyle({ fontSize: 10, fill: "#111", fontFamily: "monospace", fontWeight: "bold" }),
        })
        const bg = new Graphics()
        const bw = t.width + 4
        const bh = t.height + 2
        bg.rect(x - bw / 2 - 1, y - 8 + i * 10 - bh / 2, bw + 2, bh + 2)
        bg.fill({ color: aspColor(a.type), alpha: 0.75 })
        this.container.addChild(bg)
        t.anchor.set(0.5)
        t.x = x
        t.y = y - 8 + i * 10
        this.container.addChild(t)
        labelGraphics.push(bg)
        labelTexts.push(t)
      }
      this._aspectLabels.set(key(h.q, h.r), labelGraphics)
      this._aspectTexts.set(key(h.q, h.r), labelTexts)
    }
  }

  private buildLegend(): void {
    const lx = this.app.screen.width - 140
    const ly = 40
    const legendBg = new Graphics()
    legendBg.rect(lx - 8, ly - 8, 140, 210)
    legendBg.fill({ color: 0x1a1a2e, alpha: 0.85 })
    this.container.addChild(legendBg)

    const title = new Text({
      text: "ASPECTS",
      style: new TextStyle({ fontSize: 11, fill: "#888", fontFamily: "monospace" }),
    })
    title.x = lx
    title.y = ly
    this.container.addChild(title)

    const entries: [string, number][] = [
      ["Water", 0x4a90d9], ["Earth", 0x8b5e3c], ["Heat", 0xe06030],
      ["Mineral", 0x888888], ["Alive", 0x2d6a1e], ["Fertile", 0x7ec850],
    ]
    entries.forEach(([name, c], i) => {
      const dot = new Graphics()
      dot.circle(lx + 6, ly + 22 + i * 20, 5)
      dot.fill({ color: c })
      this.container.addChild(dot)
      const label = new Text({
        text: name,
        style: new TextStyle({ fontSize: 11, fill: "#ccc", fontFamily: "monospace" }),
      })
      label.x = lx + 16
      label.y = ly + 16 + i * 20
      this.container.addChild(label)
    })
  }

  render(): void {
    for (const g of this.overlayChildren) {
      this.overlay.removeChild(g)
      g.destroy()
    }
    for (const t of this.overlayLabels) {
      this.overlay.removeChild(t)
      t.destroy()
    }
    this.overlayChildren = []
    this.overlayLabels = []

    const state = this.getState()

    if (this._tutorialStep === 0 && state.winner === null && state.turn === 1 && !state.popup) {
      const sage = state.sages[state.playerSageIndex]
      if (sage.status === "idle" && !state.message.includes("Click")) {
        state.message = "Click any hex in your Sage's blue study radius to see its Aspects. Pick two to begin!"
      }
    }

    this.statusText.text = state.message
    this.turnText.text = `Turn ${state.turn} | Disc: ${state.discoveriesMade.length} | Arcana: ${state.arcana}`

    const dim = state.phase === "resolution"
    this.endTurnBg.alpha = dim ? 0.4 : 1.0
    this.endTurnText.alpha = dim ? 0.4 : 1.0

    if (this.revealBg) {
      this.revealBg.alpha = state.arcana >= ARCANA_REVEAL_COST && state.winner === null ? 1.0 : 0.3
    }
    if (this.revealText) {
      this.revealText.alpha = state.arcana >= ARCANA_REVEAL_COST && state.winner === null ? 1.0 : 0.3
    }

    const playerSage = state.sages.find(s => s.owner === state.playerSageIndex)
    const rivalSage = state.sages.find(s => s.owner !== state.playerSageIndex)

    for (const h of state.mapHexes.values()) {
      const g = this.hexGraphics.get(key(h.q, h.r))
      if (g) {
        const { x, y } = this.pixelCoords(h.q, h.r)
        g.clear()
        this.drawHexShape(g, x, y, HEX_SIZE - 1, h.terrain, h.style)
      }
    }

    if (playerSage && state.winner === null) {
      const { x, y } = this.pixelCoords(playerSage.q, playerSage.r)

      const sr = playerSage.studyRadius * HEX_SIZE * 2.2
      const ring = new Graphics()
      ring.circle(x, y, sr)
      ring.fill({ color: 0x00bbff, alpha: 0.08 })
      ring.circle(x, y, sr)
      ring.stroke({ width: 1, color: 0x00bbff, alpha: 0.25 })
      this.overlay.addChild(ring)
      this.overlayChildren.push(ring)

      const dot = new Graphics()
      dot.circle(x, y, 12)
      dot.fill({ color: 0x00ddff })
      dot.circle(x, y, 12)
      dot.stroke({ width: 2, color: 0xffffff, alpha: 0.5 })
      this.overlay.addChild(dot)
      this.overlayChildren.push(dot)

      const lbl = new Text({
        text: "YOU",
        style: new TextStyle({ fontSize: 9, fill: "#fff", fontFamily: "monospace", fontWeight: "bold" }),
      })
      lbl.anchor.set(0.5)
      lbl.x = x
      lbl.y = y + 18
      this.overlay.addChild(lbl)
      this.overlayLabels.push(lbl)

      if (playerSage.contemplation) {
        const c = playerSage.contemplation
        const pct = c.progressCurrent / c.progressRequired
        const barW = 30
        const barH = 4
        const bx = x - barW / 2
        const by = y + 28

        const bg = new Graphics()
        bg.rect(bx, by, barW, barH)
        bg.fill({ color: 0x333333 })
        this.overlay.addChild(bg)
        this.overlayChildren.push(bg)

        const fill = new Graphics()
        fill.rect(bx, by, barW * pct, barH)
        fill.fill({ color: 0xffdd44 })
        this.overlay.addChild(fill)
        this.overlayChildren.push(fill)

        const pctLbl = new Text({
          text: `${c.progressCurrent}/${c.progressRequired}`,
          style: new TextStyle({ fontSize: 8, fill: "#ffdd44", fontFamily: "monospace" }),
        })
        pctLbl.anchor.set(0.5)
        pctLbl.x = x
        pctLbl.y = by + barH + 2
        this.overlay.addChild(pctLbl)
        this.overlayLabels.push(pctLbl)
      }
    }

    if (rivalSage) {
      const { x, y } = this.pixelCoords(rivalSage.q, rivalSage.r)
      const dot = new Graphics()
      dot.circle(x, y, 10)
      dot.fill({ color: 0xff4444 })
      this.overlay.addChild(dot)
      this.overlayChildren.push(dot)

      const lbl = new Text({
        text: "RIVAL",
        style: new TextStyle({ fontSize: 8, fill: "#ff6666", fontFamily: "monospace", fontWeight: "bold" }),
      })
      lbl.anchor.set(0.5)
      lbl.x = x
      lbl.y = y + 16
      this.overlay.addChild(lbl)
      this.overlayLabels.push(lbl)

      if (rivalSage.contemplation) {
        const c = rivalSage.contemplation
        const pct = c.progressCurrent / c.progressRequired
        const barW = 26
        const barH = 3
        const bx = x - barW / 2
        const by = y + 22

        const bg = new Graphics()
        bg.rect(bx, by, barW, barH)
        bg.fill({ color: 0x333333 })
        this.overlay.addChild(bg)
        this.overlayChildren.push(bg)

        const fill = new Graphics()
        fill.rect(bx, by, barW * pct, barH)
        fill.fill({ color: 0xff6666 })
        this.overlay.addChild(fill)
        this.overlayChildren.push(fill)
      }
    }

    const ps = state.sages[state.playerSageIndex]
    if (ps && state.winner === null) {
      for (const h of state.mapHexes.values()) {
        const dist = hexDist(h.q, h.r, ps.q, ps.r)
        if (dist <= ps.studyRadius && dist > 0) {
          const { x, y } = this.pixelCoords(h.q, h.r)
          const marker = new Graphics()
          marker.poly(this.hexPoints(x, y, HEX_SIZE + 1), false)
          marker.stroke({ width: 1, color: 0x00ffaa, alpha: 0.35 })
          this.overlay.addChild(marker)
          this.overlayChildren.push(marker)
        }
      }
    }

    if (state.popup) {
      this.renderPopup(state.popup)
    }

    if (state.winner !== null) {
      this.renderGameOver(state)
    }

    if (state.winner === null && this._tutorialStep === 0) {
      this.renderDiscoveryPanel(state)
    }

    if (this._tutorialStep > 0) {
      this.renderTutorial(this._tutorialStep)
    }
  }

  private renderPopup(popup: { title: string; description: string; domain: string }): void {
    const cw = this.app.screen.width
    const ch = this.app.screen.height

    const pw = 360
    const ph = 160
    const px = (cw - pw) / 2
    const py = (ch - ph) / 2 - 40

    const bg = new Graphics()
    bg.rect(px, py, pw, ph)
    bg.fill({ color: 0x1a1a2e, alpha: 0.95 })
    bg.rect(px, py, pw, ph)
    bg.stroke({ width: 2, color: 0xffdd44 })

    const domainColors: Record<string, number> = { vital: 0x7ec850, material: 0xc0c0c0, mystic: 0xd4a0d4, civic: 0x4a90d9 }
    const dc = domainColors[popup.domain] ?? 0xaaaaaa
    const accent = new Graphics()
    accent.rect(px, py, 4, ph)
    accent.fill({ color: dc })
    bg.addChild(accent)

    this.overlay.addChild(bg)
    this.overlayChildren.push(bg)

    const title = new Text({
      text: `DISCOVERY: ${popup.title}`,
      style: new TextStyle({ fontSize: 16, fill: "#ffdd44", fontFamily: "monospace", fontWeight: "bold" }),
    })
    title.x = px + 20
    title.y = py + 20
    this.overlay.addChild(title)
    this.overlayLabels.push(title)

    const desc = new Text({
      text: popup.description,
      style: new TextStyle({ fontSize: 12, fill: "#ccc", fontFamily: "monospace", wordWrap: true, wordWrapWidth: pw - 40 }),
    })
    desc.x = px + 20
    desc.y = py + 50
    this.overlay.addChild(desc)
    this.overlayLabels.push(desc)

    const hint = new Text({
      text: "Click anywhere to continue",
      style: new TextStyle({ fontSize: 10, fill: "#666", fontFamily: "monospace" }),
    })
    hint.anchor.set(0.5)
    hint.x = px + pw / 2
    hint.y = py + ph - 16
    this.overlay.addChild(hint)
    this.overlayLabels.push(hint)
  }

  private renderGameOver(state: GameState): void {
    const cw = this.app.screen.width
    const ch = this.app.screen.height
    const won = state.winner === 0

    const bg = new Graphics()
    bg.rect(0, 0, cw, ch)
    bg.fill({ color: 0x000000, alpha: 0.75 })
    this.overlay.addChild(bg)
    this.overlayChildren.push(bg)

    const pw = 400
    const ph = 200
    const px = (cw - pw) / 2
    const py = (ch - ph) / 2 - 40

    const box = new Graphics()
    box.rect(px, py, pw, ph)
    box.fill({ color: 0x1a1a2e, alpha: 0.95 })
    box.rect(px, py, pw, ph)
    box.stroke({ width: 3, color: won ? 0xffdd44 : 0xff4444 })
    this.overlay.addChild(box)
    this.overlayChildren.push(box)

    const status = won ? "VICTORY" : "DEFEAT"
    const statusColor = won ? "#ffdd44" : "#ff4444"
    const titleText = new Text({
      text: status,
      style: new TextStyle({ fontSize: 28, fill: statusColor, fontFamily: "monospace", fontWeight: "bold" }),
    })
    titleText.anchor.set(0.5)
    titleText.x = px + pw / 2
    titleText.y = py + 45
    this.overlay.addChild(titleText)
    this.overlayLabels.push(titleText)

    const score = new Text({
      text: `You: ${state.discoveriesMade.length}  |  Rival: ${state.rivalDiscoveryCount}`,
      style: new TextStyle({ fontSize: 14, fill: "#ccc", fontFamily: "monospace" }),
    })
    score.anchor.set(0.5)
    score.x = px + pw / 2
    score.y = py + 85
    this.overlay.addChild(score)
    this.overlayLabels.push(score)

    const turnCount = new Text({
      text: `Turn ${state.turn}`,
      style: new TextStyle({ fontSize: 12, fill: "#888", fontFamily: "monospace" }),
    })
    turnCount.anchor.set(0.5)
    turnCount.x = px + pw / 2
    turnCount.y = py + 110
    this.overlay.addChild(turnCount)
    this.overlayLabels.push(turnCount)

    RESTART_BTN.x = px + pw / 2 - RESTART_BTN.w / 2
    RESTART_BTN.y = py + 140

    const btn = new Graphics()
    btn.rect(RESTART_BTN.x, RESTART_BTN.y, RESTART_BTN.w, RESTART_BTN.h)
    btn.fill({ color: 0x3a6b3a })
    btn.rect(RESTART_BTN.x, RESTART_BTN.y, RESTART_BTN.w, RESTART_BTN.h)
    btn.stroke({ width: 1, color: 0x5a9b5a })
    this.overlay.addChild(btn)
    this.overlayChildren.push(btn)

    const btnLbl = new Text({
      text: "Play Again",
      style: new TextStyle({ fontSize: 14, fill: "#fff", fontFamily: "monospace", fontWeight: "bold" }),
    })
    btnLbl.anchor.set(0.5)
    btnLbl.x = RESTART_BTN.x + RESTART_BTN.w / 2
    btnLbl.y = RESTART_BTN.y + RESTART_BTN.h / 2
    this.overlay.addChild(btnLbl)
    this.overlayLabels.push(btnLbl)
  }

  private drawHexShape(g: Graphics, cx: number, cy: number, size: number, terrain: string, style: string): void {
    const color = COLORS[terrain] ?? 0x666666
    const alpha = style === "study" ? 0.85 : 1.0
    g.poly(this.hexPoints(cx, cy, size), true)
    g.fill({ color, alpha })
    g.poly(this.hexPoints(cx, cy, size), false)
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

  getHexAtPixel(px: number, py: number): { q: number; r: number } | null {
    let best: { q: number; r: number } | null = null
    let bestDist = HEX_SIZE
    const state = this.getState()
    for (const h of state.mapHexes.values()) {
      const { x, y } = this.pixelCoords(h.q, h.r)
      const dx = px - x
      const dy = py - y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < bestDist) {
        bestDist = d
        best = { q: h.q, r: h.r }
      }
    }
    return best
  }

  get tutorialActive(): boolean {
    return this._tutorialStep > 0
  }

  get tutorialStep(): number {
    return this._tutorialStep
  }

  advanceTutorial(): void {
    if (this._tutorialStep > 0 && this._tutorialStep < 4) {
      this._tutorialStep++
      if (this._tutorialStep === 4) this._tutorialStep = 0
    }
  }

  private renderTutorial(step: number): void {
    const cw = this.app.screen.width
    const ch = this.app.screen.height

    const bg = new Graphics()
    bg.rect(0, 0, cw, ch)
    bg.fill({ color: 0x000000, alpha: 0.85 })
    this.overlay.addChild(bg)
    this.overlayChildren.push(bg)

    const pw = 480
    const ph = 320
    const px = (cw - pw) / 2
    const py = (ch - ph) / 2 - 20

    const box = new Graphics()
    box.rect(px, py, pw, ph)
    box.fill({ color: 0x1a1a2e, alpha: 0.95 })
    box.rect(px, py, pw, ph)
    box.stroke({ width: 2, color: 0x6a5acd })
    this.overlay.addChild(box)
    this.overlayChildren.push(box)

    const panels = [
      {
        title: "WELCOME TO ASPECT",
        lines: [
          "You lead a civilization searching for knowledge.",
          "",
          "The world is made of hidden Aspects — Water, Earth,",
          "Heat, Mineral, Alive, Fertile — that color every hex.",
          "",
          "Your Sage studies the land and combines Aspects",
          "to make discoveries. Each discovery transforms",
          "the map around you.",
          "",
          "Your rival Sage is doing the same. Race to",
          "10 discoveries before they do!",
        ],
      },
      {
        title: "HOW TO PLAY",
        lines: [
          "1. Click a hex in your Sage's blue study radius",
          "   to pick an Aspect label (e.g. 'watr' or 'eart').",
          "",
          "2. Click another hex to pick a second Aspect.",
          "   Your Sage begins Contemplation.",
          "",
          "3. Press End Turn or [E] to advance time.",
          "   The progress bar shows how close you are.",
          "",
          "4. When Contemplation completes → DISCOVERY!",
          "   The map changes and new options open.",
          "",
          "Tip: You can also click a walkable hex to move",
          "your Sage to a new study area.",
        ],
      },
      {
        title: "YOUR GOAL",
        lines: [
          "Win by reaching 10 discoveries first.",
          "The game ends at Turn 30 if no one reaches 10.",
          "",
          "The Rival Sage discovers independently — check",
          "their progress bar to see what they're working on.",
          "",
          "Failed combinations give 5 Arcana. Spend 10 Arcana",
          "on the Reveal button for a hint.",
          "",
          "Discoveries chain: Irrigation → Tillage → Cultivation.",
          "Follow the chains to unlock deeper knowledge!",
        ],
      },
    ]

    const panel = panels[step - 1]
    const title = new Text({
      text: panel.title,
      style: new TextStyle({ fontSize: 20, fill: "#ffdd44", fontFamily: "monospace", fontWeight: "bold" }),
    })
    title.anchor.set(0.5)
    title.x = px + pw / 2
    title.y = py + 30
    this.overlay.addChild(title)
    this.overlayLabels.push(title)

    const body = new Text({
      text: panel.lines.join("\n"),
      style: new TextStyle({ fontSize: 12, fill: "#ccc", fontFamily: "monospace", lineHeight: 18, wordWrap: true, wordWrapWidth: pw - 40 }),
    })
    body.x = px + 20
    body.y = py + 60
    this.overlay.addChild(body)
    this.overlayLabels.push(body)

    const dots = new Text({
      text: `${step} / 3`,
      style: new TextStyle({ fontSize: 11, fill: "#6a5acd", fontFamily: "monospace" }),
    })
    dots.anchor.set(0.5)
    dots.x = px + pw / 2
    dots.y = py + ph - 28
    this.overlay.addChild(dots)
    this.overlayLabels.push(dots)

    const hint = new Text({
      text: "Click to continue",
      style: new TextStyle({ fontSize: 10, fill: "#666", fontFamily: "monospace" }),
    })
    hint.anchor.set(0.5)
    hint.x = px + pw / 2
    hint.y = py + ph - 12
    this.overlay.addChild(hint)
    this.overlayLabels.push(hint)
  }

  resetTutorial(): void {
    this._tutorialStep = 1
  }

  private renderDiscoveryPanel(state: GameState): void {
    const discovered = DISCOVERIES.filter(d => state.discoveriesMade.includes(d.id))
    const px = 8
    const py = 20
    const pw = 150
    const maxH = state.turn > 1 ? Math.min(220, 40 + discovered.length * 22) : 0
    if (state.turn <= 1) return

    const bg = new Graphics()
    bg.rect(px, py, pw, maxH)
    bg.fill({ color: 0x1a1a2e, alpha: 0.85 })
    bg.rect(px, py, pw, maxH)
    bg.stroke({ width: 1, color: 0x2a2a3e })
    this.overlay.addChild(bg)
    this.overlayChildren.push(bg)

    const head = new Text({
      text: `DISCOVERIES (${state.discoveriesMade.length}/10)`,
      style: new TextStyle({ fontSize: 9, fill: "#888", fontFamily: "monospace", fontWeight: "bold" }),
    })
    head.x = px + 6
    head.y = py + 6
    this.overlay.addChild(head)
    this.overlayLabels.push(head)

    const domainColors: Record<string, string> = { vital: "#7ec850", material: "#c0c0c0", mystic: "#d4a0d4", civic: "#4a90d9" }
    discovered.forEach((d, i) => {
      const dc = domainColors[d.domain] ?? "#888"
      const item = new Text({
        text: `\u25CF ${d.name}`,
        style: new TextStyle({ fontSize: 9, fill: dc, fontFamily: "monospace" }),
      })
      item.x = px + 6
      item.y = py + 20 + i * 18
      this.overlay.addChild(item)
      this.overlayLabels.push(item)
    })
  }

  destroy(): void {
    this._hoverGraphic.removeFromParent()
    this._hoverGraphic.destroy()
    this.container.removeFromParent()
    this.overlay.removeFromParent()
    this.uiLayer.removeFromParent()
  }
}

function aspColor(type: string): number {
  return ASPECT_COLOR_MAP[type] ?? 0xaaaaaa
}
