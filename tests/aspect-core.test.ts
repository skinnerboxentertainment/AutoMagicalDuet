import { describe, it, expect } from "vitest"
import { hexDist, createInitialState, tryContemplate, resolveContemplations, endTurn, movePlayerSage, spendArcanaReveal, getAvailableDiscoveryPairs } from "../src/aspect/game-logic"
import { createMapCells, key } from "../src/aspect/map-data"
import { findDiscovery } from "../src/aspect/discovery-pool"
import type { HexTile } from "../src/aspect/types"

function buildTestMap(): Map<string, HexTile> {
  const cells = createMapCells()
  const hexes = new Map<string, HexTile>()
  for (const c of cells) {
    hexes.set(key(c.q, c.r), {
      q: c.q,
      r: c.r,
      terrain: c.terrain,
      aspects: c.aspects.map(([type, strength]) => ({ type, strength, source: "terrain" })),
      owner: c.terrain === "water" ? null : 0,
      style: "normal",
    })
  }
  return hexes
}

describe("hexDist", () => {
  it("returns 0 for same hex", () => {
    expect(hexDist(3, 5, 3, 5)).toBe(0)
  })
  it("returns 1 for adjacent hex", () => {
    expect(hexDist(0, 0, 1, 0)).toBe(1)
    expect(hexDist(0, 0, 0, 1)).toBe(1)
    expect(hexDist(0, 0, -1, 1)).toBe(1)
  })
  it("is symmetric", () => {
    expect(hexDist(2, 8, 9, 2)).toBe(hexDist(9, 2, 2, 8))
  })
  it("handles negative coordinates", () => {
    expect(hexDist(-5, -3, -7, -1)).toBeGreaterThanOrEqual(0)
  })
})

describe("createInitialState", () => {
  it("creates two sages at expected positions", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    expect(state.sages).toHaveLength(2)
    expect(state.sages[0].q).toBe(2)
    expect(state.sages[0].r).toBe(8)
    expect(state.sages[1].q).toBe(9)
    expect(state.sages[1].r).toBe(2)
  })
  it("starts at turn 1 with empty discoveries", () => {
    const state = createInitialState(buildTestMap())
    expect(state.turn).toBe(1)
    expect(state.discoveriesMade).toHaveLength(0)
    expect(state.rivalDiscoveryCount).toBe(0)
    expect(state.winner).toBeNull()
  })
})

describe("findDiscovery", () => {
  it("finds known pair", () => {
    const d = findDiscovery("water", "earth")
    expect(d).not.toBeNull()
    expect(d!.id).toBe("irrigation")
  })
  it("finds pair in either order", () => {
    const a = findDiscovery("heat", "mineral")
    const b = findDiscovery("mineral", "heat")
    expect(a!.id).toBe(b!.id)
  })
  it("returns null for unknown pair", () => {
    expect(findDiscovery("water", "fire")).toBeNull()
  })
  it("covers all 15 discoveries", () => {
    const pairs = [
      ["water", "earth"], ["earth", "fertile"], ["fertile", "alive"],
      ["heat", "mineral"], ["metal", "heat"], ["earth", "mineral"],
      ["alive", "water"], ["water", "fertile"], ["earth", "industry"],
      ["heat", "alive"], ["alive", "fertile"], ["mineral", "water"],
      ["alive", "earth"], ["heat", "fertile"], ["water", "mineral"],
    ]
    for (const [a, b] of pairs) {
      expect(findDiscovery(a, b), `${a}+${b} should be found`).not.toBeNull()
    }
  })
})

describe("tryContemplate", () => {
  it("starts contemplation for valid pair", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    const msg = tryContemplate(state, 0, "water", "earth")
    expect(msg).toContain("Irrigation")
    expect(state.sages[0].status).toBe("contemplating")
  })
  it("rejects pair not in sage radius", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    const msg = tryContemplate(state, 0, "water", "mineral")
    expect(msg).toContain("radius")
  })
  it("rejects busy sage", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    tryContemplate(state, 0, "water", "earth")
    const msg = tryContemplate(state, 0, "heat", "mineral")
    expect(msg).toContain("busy")
  })
  it("rejects rival sage control", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    const msg = tryContemplate(state, 1, "water", "earth")
    expect(msg).toContain("rival")
  })
  it("records failed pair and awards arcana", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    const arcanaBefore = state.arcana
    state.sages[0].q = 5
    state.sages[0].r = 5
    state.sages[0].studyRadius = 2
    // earth + heat exists in radius but has no discovery mapping
    const msg = tryContemplate(state, 0, "earth", "heat")
    expect(msg).toContain("Arcana")
    expect(state.arcana).toBe(arcanaBefore + 5)
  })
})

describe("resolveContemplations", () => {
  it("advances progress and completes when done", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    tryContemplate(state, 0, "water", "earth")
    const sage = state.sages[0]
    const req = sage.contemplation!.progressRequired
    for (let i = 0; i < req; i++) {
      resolveContemplations(state)
    }
    expect(sage.status).toBe("idle")
    expect(state.discoveriesMade).toContain("irrigation")
  })
  it("increments rivalDiscoveryCount on rival discovery", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    const rival = state.sages[1]
    // Place rival near plains with earth+fertile for tillage
    rival.q = 5
    rival.r = 5
    rival.status = "contemplating"
    rival.contemplation = {
      aspectA: "earth",
      aspectB: "fertile",
      progressRequired: 1,
      progressCurrent: 0,
      expectedDiscoveryId: "irrigation",
    }
    resolveContemplations(state)
    expect(state.rivalDiscoveryCount).toBe(1)
  })
})

describe("endTurn", () => {
  it("increments turn", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    endTurn(state)
    expect(state.turn).toBe(2)
  })
  it("declares winner at 10 discoveries", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    // Manually set discoveries to simulate many discoveries
    for (let i = 0; i < 10; i++) {
      state.discoveriesMade.push(`d${i}`)
    }
    endTurn(state)
    expect(state.winner).toBe(0)
  })
  it("turn limit triggers game over at MAX_TURNS + 1", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    state.turn = 31
    endTurn(state)
    expect(state.winner).not.toBeNull()
  })
})

describe("movePlayerSage", () => {
  it("moves sage within range", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    const msg = movePlayerSage(state, 3, 7)
    expect(msg).toBe("Sage moved.")
    expect(state.sages[0].q).toBe(3)
    expect(state.sages[0].r).toBe(7)
  })
  it("rejects movement to water", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    // Row 11 is entirely water
    const msg = movePlayerSage(state, 2, 11)
    expect(msg).toContain("Cannot move")
  })
})

describe("spendArcanaReveal", () => {
  it("gives hint when arcana is sufficient", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    state.arcana = 10
    const msg = spendArcanaReveal(state)
    expect(msg).toContain("Hint")
    expect(state.arcana).toBe(0)
  })
  it("rejects when arcana is insufficient", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    state.arcana = 5
    const msg = spendArcanaReveal(state)
    expect(msg).toContain("Need")
  })
})

describe("getAvailableDiscoveryPairs", () => {
  it("returns valid pairs for player sage start position", () => {
    const map = buildTestMap()
    const state = createInitialState(map)
    const pairs = getAvailableDiscoveryPairs(state, 0)
    // Sage at (2, 8) radius 1 — should have some basic pairs
    expect(pairs.length).toBeGreaterThanOrEqual(1)
    for (const [a, b] of pairs) {
      const d = findDiscovery(a, b)
      expect(d).not.toBeNull()
    }
  })
})
