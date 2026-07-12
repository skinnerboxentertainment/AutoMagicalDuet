import { Application } from "pixi.js"
import { createMapCells, key } from "./map-data"
import { createInitialState, getAspectsInRadius, tryContemplate, endTurn, getAvailableDiscoveryPairs, hexDist } from "./game-logic"
import { HexRenderer } from "./hex-renderer"
import type { GameState, HexTile } from "./types"
import { findDiscovery } from "./discovery-pool"

let state: GameState
let renderer: HexRenderer
let app: Application
let selectedAspect1: string | null = null

export async function bootAspect(canvasTarget: HTMLElement): Promise<void> {
  app = new Application()

  await app.init({
    width: 800,
    height: 600,
    background: 0x0d0d1a,
    antialias: true,
  })

  canvasTarget.innerHTML = ""
  canvasTarget.appendChild(app.canvas)

  const cells = createMapCells()
  const hexes = new Map<string, HexTile>()
  for (const c of cells) {
    const tile: HexTile = {
      q: c.q,
      r: c.r,
      terrain: c.terrain,
      feature: null,
      aspects: c.aspects.map(([type, strength]) => ({
        type,
        strength,
        source: "terrain",
      })),
      owner: (c.terrain === "water") ? null : 0,
      ownerCity: null,
      improvement: null,
      style: "normal",
    }
    hexes.set(key(c.q, c.r), tile)
  }

  state = createInitialState(hexes)
  renderer = new HexRenderer(app, () => state)

  renderer.render()

  app.canvas.style.cursor = "pointer"
  app.canvas.addEventListener("click", (e: MouseEvent) => {
    const rect = app.canvas.getBoundingClientRect()
    const scaleX = app.screen.width / rect.width
    const scaleY = app.screen.height / rect.height
    const px = (e.clientX - rect.left) * scaleX
    const py = (e.clientY - rect.top) * scaleY
    handleClick(px, py)
  })

  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "e") {
      handleEndTurn()
    }
    if (e.key === "Escape") {
      selectedAspect1 = null
      state.selectedAspects = []
      state.message = "Selection cleared."
      renderer.render()
    }
  })
}

function handleClick(px: number, py: number): void {
  if (state.winner !== null) return
  if (state.phase !== "player") return

  const hex = renderer.getHexAtPixel(px, py)
  if (!hex) return

  const sage = state.sages[state.playerSageIndex]
  const dist = hexDist(hex.q, hex.r, sage.q, sage.r)

  if (dist === 0) {
    selectedAspect1 = null
    state.selectedAspects = []
    state.message = "Sage selected. Click two aspects in study radius."
    renderer.render()
    return
  }

  if (dist <= sage.studyRadius) {
    const tile = state.mapHexes.get(key(hex.q, hex.r))
    if (!tile) return

    const aspects = tile.aspects.filter(a => a.strength > 0).map(a => a.type)

    if (selectedAspect1 === null && aspects.length > 0) {
      if (aspects.length === 1) {
        selectedAspect1 = aspects[0]
        state.message = `Selected ${aspects[0]}. Click a second aspect.`
        renderer.render()
        return
      }
      const aspectNames = aspects.join(", ")
      state.message = `Which aspect? (${aspectNames}) — Click the hex again to pick, or use a different hex.`
      const nextPick = aspects[0]
      if (nextPick) {
        selectedAspect1 = nextPick
        state.message = `Selected ${nextPick}. Click a second aspect.`
        renderer.render()
      }
      return
    }

    if (selectedAspect1 !== null) {
      const aspect2 = aspects.length > 0 ? aspects[0] : null
      if (aspect2 && aspect2 !== selectedAspect1) {
        const msg = tryContemplate(state, state.playerSageIndex, selectedAspect1, aspect2)
        state.message = msg
        selectedAspect1 = null
        renderer.render()
        return
      } else if (aspect2 === selectedAspect1 && aspects.length > 1) {
        const a2 = aspects[1]
        if (a2) {
          const msg = tryContemplate(state, state.playerSageIndex, selectedAspect1, a2)
          state.message = msg
          selectedAspect1 = null
          renderer.render()
          return
        }
      }
      if (aspect2 === selectedAspect1) {
        const d = findDiscovery(selectedAspect1, selectedAspect1)
        if (!d) {
          state.message = "Same pair — no self-discovery."
          selectedAspect1 = null
          renderer.render()
          return
        }
        const msg = tryContemplate(state, state.playerSageIndex, selectedAspect1, selectedAspect1)
        state.message = msg
        selectedAspect1 = null
        renderer.render()
        return
      }
    }
  }

  state.message = "Click a hex in your Sage's study radius."
  renderer.render()
}

function handleEndTurn(): void {
  if (state.winner !== null) return
  if (state.phase !== "player") return

  const sage = state.sages[state.playerSageIndex]
  if (sage.status === "idle" && getAvailableDiscoveryPairs(state, state.playerSageIndex).length > 0) {
    state.message = "Set a contemplation before ending turn, or press E again to skip."
    renderer.render()
    if (!confirmSkip) {
      confirmSkip = true
      return
    }
  }
  confirmSkip = false

  const msgs = endTurn(state)
  state.message = msgs.join(" | ")
  renderer.render()
}

let confirmSkip = false

export function destroyAspect(): void {
  if (renderer) renderer.destroy()
  if (app) app.destroy()
}
