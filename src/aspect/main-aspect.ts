import { Application } from "pixi.js"
import { createMapCells, key } from "./map-data"
import { createInitialState, tryContemplate, endTurn, getAvailableDiscoveryPairs, hexDist, movePlayerSage, spendArcanaReveal } from "./game-logic"
import { HexRenderer } from "./hex-renderer"
import type { GameState, HexTile } from "./types"
import { sfxClick, sfxDiscovery, sfxEndTurn, sfxMove, sfxReveal, sfxGameOver } from "./sfx"

let state: GameState
let renderer: HexRenderer
let app: Application | null = null
let canvasTarget: HTMLElement

export async function bootAspect(target: HTMLElement): Promise<void> {
  canvasTarget = target
  await startNewGame()
}

async function startNewGame(): Promise<void> {
  if (renderer) renderer.destroy()
  if (app) app.destroy({ removeView: true })

  const a = new Application()
  app = a
  const vw = Math.max(960, window.innerWidth || 960)
  const vh = Math.max(700, window.innerHeight || 700)
  await a.init({
    width: vw,
    height: vh,
    background: 0x0d0d1a,
    antialias: true,
    autoDensity: true,
    resolution: Math.min(2, window.devicePixelRatio || 1),
  })

  canvasTarget.innerHTML = ""
  canvasTarget.appendChild(a.canvas)

  const cells = createMapCells()
  const hexes = new Map<string, HexTile>()
  for (const c of cells) {
    const tile: HexTile = {
      q: c.q,
      r: c.r,
      terrain: c.terrain,
      aspects: c.aspects.map(([type, strength]) => ({ type, strength, source: "terrain" })),
      owner: c.terrain === "water" ? null : 0,
      style: "normal",
    }
    hexes.set(key(c.q, c.r), tile)
  }

  state = createInitialState(hexes)
  renderer = new HexRenderer(a, () => state)
  renderer.render()

  if (renderer.tutorialActive) {
    state.message = "Welcome! Click anywhere for a quick tutorial."
  }

  a.canvas.style.cursor = "pointer"

  function canvasCoords(e: MouseEvent): { px: number; py: number } {
    const rect = a.canvas.getBoundingClientRect()
    const scaleX = a.screen.width / rect.width
    const scaleY = a.screen.height / rect.height
    return { px: (e.clientX - rect.left) * scaleX, py: (e.clientY - rect.top) * scaleY }
  }

  a.canvas.addEventListener("click", (e: MouseEvent) => {
    const { px, py } = canvasCoords(e)
    handleClick(px, py)
  })

  a.canvas.addEventListener("mousemove", (e: MouseEvent) => {
    const { px, py } = canvasCoords(e)
    renderer.updateHover(px, py)
  })
  a.canvas.addEventListener("mouseleave", () => {
    renderer.updateHover(-1, -1)
  })
}

let _keyHandler: ((e: KeyboardEvent) => void) | null = null

function handleKey(e: KeyboardEvent): void {
  if (!app || !renderer || !state) return
  if (e.key === "Enter" || e.key === "e") {
    handleEndTurn()
  }
  if (e.key === "Escape") {
    pickingAspect = false
    firstPickedAspect = null
    firstPickedHex = null
    state.message = "Selection cleared."
    renderer.render()
  }
}

let pickingAspect = false
let firstPickedAspect: string | null = null
let firstPickedHex: { q: number; r: number } | null = null

if (!_keyHandler) {
  _keyHandler = handleKey
  window.addEventListener("keydown", _keyHandler)
}

function handleClick(px: number, py: number): void {
  state.popup = null

  if (renderer.tutorialActive) {
    renderer.advanceTutorial()
    renderer.render()
    return
  }

  if (renderer.isEndTurnHit(px, py)) {
    sfxClick()
    handleEndTurn()
    return
  }

  if (renderer.isRevealHit(px, py)) {
    sfxClick()
    const msg = spendArcanaReveal(state)
    if (msg.startsWith("Hint")) sfxReveal()
    state.message = msg
    renderer.render()
    return
  }

  if (renderer.isRestartHit(px, py)) {
    sfxClick()
    startNewGame().catch(console.error)
    return
  }

  if (state.winner !== null) {
    if (state.winner === 1) sfxGameOver()
    return
  }
  if (state.phase !== "player") return

  const hex = renderer.getHexAtPixel(px, py)
  if (!hex) {
    state.message = "Click on a hex."
    renderer.render()
    return
  }

  const sage = state.sages[state.playerSageIndex]
  const dist = hexDist(hex.q, hex.r, sage.q, sage.r)

  if (dist === 0) {
    pickingAspect = false
    firstPickedAspect = null
    firstPickedHex = null
    state.message = "Sage selected. Study radius shown in blue. Click a highlighted hex."
    renderer.render()
    return
  }

  if (dist > sage.studyRadius && dist <= sage.moveRange && sage.status === "idle" && !pickingAspect) {
    const msg = movePlayerSage(state, hex.q, hex.r)
    if (msg === "Sage moved.") sfxMove()
    state.message = msg
    pickingAspect = false
    firstPickedAspect = null
    firstPickedHex = null
    renderer.render()
    return
  }

  if (dist > sage.studyRadius) {
    state.message = "Too far. Click a hex in the study radius or a walkable hex to move."
    renderer.render()
    return
  }

  const tile = state.mapHexes.get(key(hex.q, hex.r))
  if (!tile) return

  const aspects = tile.aspects.filter(a => a.strength > 0).map(a => a.type)
  if (aspects.length === 0) {
    state.message = "This hex has no usable aspects."
    renderer.render()
    return
  }

  if (!pickingAspect) {
    pickingAspect = true
    firstPickedAspect = aspects.length === 1 ? aspects[0] : null
    firstPickedHex = { q: hex.q, r: hex.r }

    if (aspects.length === 1) {
      state.message = `Picked ${aspects[0]}. Click another hex for a second aspect.`
    } else if (aspects.length === 2) {
      state.message = `Click ${aspects[0]} or ${aspects[1]} on this hex, or pick another hex.`
    } else {
      state.message = `Pick an aspect on this hex: ${aspects.join(", ")}`
    }
    renderer.render()
    return
  }

  const aspect2 = aspects.length === 1 ? aspects[0] : null
  if (!firstPickedAspect) {
    if (firstPickedHex && hex.q === firstPickedHex.q && hex.r === firstPickedHex.r) {
      if (!aspect2 && aspects.length === 1) {
        state.message = "Need a different second aspect. Try clicking a different hex."
        pickingAspect = false
        firstPickedAspect = null
        firstPickedHex = null
        renderer.render()
        return
      }
      const msg = tryContemplate(state, state.playerSageIndex, aspects[0], aspects[1])
      state.message = msg
      pickingAspect = false
      firstPickedAspect = null
      firstPickedHex = null
      renderer.render()
      return
    }
    state.message = "First pick a specific aspect by clicking the same hex again."
    renderer.render()
    return
  }

  if (!aspect2) {
    state.message = "Pick a second aspect from a different hex."
    renderer.render()
    return
  }

  const pk = [firstPickedAspect, aspect2].sort().join("|")
  if (state.failedPairs.includes(pk)) {
    state.message = `Already tried ${firstPickedAspect} + ${aspect2}. Pick different aspects.`
    pickingAspect = false
    firstPickedAspect = null
    firstPickedHex = null
    renderer.render()
    return
  }

  sfxClick()
  const msg = tryContemplate(state, state.playerSageIndex, firstPickedAspect, aspect2)
  state.message = msg
  pickingAspect = false
  firstPickedAspect = null
  firstPickedHex = null
  renderer.render()
}

function handleEndTurn(): void {
  if (state.winner !== null) return
  if (state.phase !== "player") return

  const sage = state.sages[state.playerSageIndex]
  if (sage.status === "idle" && getAvailableDiscoveryPairs(state, state.playerSageIndex).length > 0) {
    state.message = "Press E again to end turn without a new contemplation."
    renderer.render()
    if (!confirmSkip) {
      confirmSkip = true
      return
    }
  }
  confirmSkip = false

  sfxEndTurn()
  const msgs = endTurn(state)
  if (msgs.some(m => m.includes("discovered"))) sfxDiscovery()
  if (state.winner !== null) sfxGameOver()
  state.message = msgs.join(" | ")
  pickingAspect = false
  firstPickedAspect = null
  firstPickedHex = null
  renderer.render()
}

let confirmSkip = false

export function destroyAspect(): void {
  if (renderer) renderer.destroy()
}
