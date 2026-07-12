import type { GameState, HexTile, SageUnit, Contemplation, AspectInstance } from "./types"
import { DISCOVERIES, findDiscovery } from "./discovery-pool"
import { key } from "./map-data"

export function createInitialState(mapHexes: Map<string, HexTile>): GameState {
  const playerSage: SageUnit = {
    id: "sage_player",
    owner: 0,
    q: 2,
    r: 8,
    level: 1,
    studyRadius: 1,
    status: "idle",
    contemplation: null,
    domain: null,
  }
  const rivalSage: SageUnit = {
    id: "sage_rival",
    owner: 1,
    q: 9,
    r: 2,
    level: 1,
    studyRadius: 1,
    status: "idle",
    contemplation: null,
    domain: null,
  }
  return {
    turn: 1,
    phase: "player",
    mapHexes,
    sages: [playerSage, rivalSage],
    playerSageIndex: 0,
    rivalSageIndex: 1,
    discoveriesMade: [],
    failedPairs: [],
    arcana: 0,
    selectedSageIndex: 0,
    selectedAspects: [],
    message: "Select aspects in your Sage's study radius to begin contemplation.",
    winner: null,
  }
}

export function getAspectsInRadius(state: GameState, sageIdx: number): string[] {
  const sage = state.sages[sageIdx]
  if (!sage) return []
  const aspectSet = new Set<string>()
  for (const h of state.mapHexes.values()) {
    const dist = hexDist(h.q, h.r, sage.q, sage.r)
    if (dist <= sage.studyRadius) {
      for (const a of h.aspects) {
        if (a.strength > 0) aspectSet.add(a.type)
      }
    }
  }
  return Array.from(aspectSet).sort()
}

export function hasPrerequisitesMet(state: GameState, discoveryId: string): boolean {
  const d = DISCOVERIES.find(x => x.id === discoveryId)
  if (!d) return false
  return d.prerequisites.every(p => state.discoveriesMade.includes(p))
}

export function getAvailableDiscoveryPairs(state: GameState, sageIdx: number): [string, string][] {
  const aspects = getAspectsInRadius(state, sageIdx)
  const pairs: [string, string][] = []
  const seen = new Set<string>()
  for (let i = 0; i < aspects.length; i++) {
    for (let j = i + 1; j < aspects.length; j++) {
      const a = aspects[i]
      const b = aspects[j]
      const pk = [a, b].sort().join("|")
      if (seen.has(pk)) continue
      seen.add(pk)
      if (state.failedPairs.includes(pk)) continue
      const d = findDiscovery(a, b)
      if (d && !state.discoveriesMade.includes(d.id) && hasPrerequisitesMet(state, d.id)) {
        pairs.push([a, b])
      }
    }
  }
  return pairs
}

export function tryContemplate(state: GameState, sageIdx: number, aspectA: string, aspectB: string): string {
  const sage = state.sages[sageIdx]
  if (!sage) return "No such Sage."
  if (sage.status !== "idle") return "Sage is busy."
  if (sageIdx === state.rivalSageIndex) return "Cannot control rival Sage."

  const aspects = getAspectsInRadius(state, sageIdx)
  if (!aspects.includes(aspectA) || !aspects.includes(aspectB)) {
    return "Both aspects must be in the Sage's study radius."
  }

  const fpk = [aspectA, aspectB].sort().join("|")
  if (state.failedPairs.includes(fpk)) {
    return "This pair has already been attempted and produced nothing."
  }

  const d = findDiscovery(aspectA, aspectB)
  if (!d) {
    state.failedPairs.push(fpk)
    state.arcana += 5
    sage.status = "idle"
    return "No discovery from this combination. Arcana +5."
  }

  if (!hasPrerequisitesMet(state, d.id)) {
    return `Prerequisites not met for ${d.name}.`
  }

  if (state.discoveriesMade.includes(d.id)) {
    return `${d.name} is already known.`
  }

  sage.contemplation = {
    aspectA,
    aspectB,
    progressRequired: d.turnsRequired,
    progressCurrent: 0,
    expectedDiscoveryId: d.id,
  }
  sage.status = "contemplating"
  return `Contemplating ${d.name}... (${d.turnsRequired} turns)`
}

export function resolveContemplations(state: GameState): string[] {
  const msgs: string[] = []
  for (const sage of state.sages) {
    if (sage.status !== "contemplating" || !sage.contemplation) continue
    sage.contemplation.progressCurrent++
    if (sage.contemplation.progressCurrent >= sage.contemplation.progressRequired) {
      const dId = sage.contemplation.expectedDiscoveryId
      if (dId && !state.discoveriesMade.includes(dId)) {
        applyDiscovery(state, dId, sage)
        msgs.push(`${sage.id} discovered ${dId}!`)
      }
      sage.contemplation = null
      sage.status = "idle"
    }
  }
  return msgs
}

export function applyDiscovery(state: GameState, dId: string, sage: SageUnit) {
  const d = DISCOVERIES.find(x => x.id === dId)
  if (!d) return
  state.discoveriesMade.push(dId)
  state.arcana += 20

  for (const ac of d.aspectChanges) {
    for (const h of state.mapHexes.values()) {
      const dist = hexDist(h.q, h.r, sage.q, sage.r)
      if (dist <= ac.radius) {
        if (ac.terrainFilter && h.terrain !== ac.terrainFilter) continue
        const existing = h.aspects.find(a => a.type === ac.aspectType)
        if (existing) {
          existing.strength = Math.min(1, existing.strength + ac.strength)
        } else {
          h.aspects.push({ type: ac.aspectType, strength: ac.strength, source: `discovery_${dId}` })
        }
      }
    }
  }

  sage.level = Math.min(5, sage.level + 1)
  if (sage.level >= 2) sage.studyRadius = Math.max(sage.studyRadius, 2)
}

export function rivalAct(state: GameState): string[] {
  const msgs: string[] = []
  const rival = state.sages[state.rivalSageIndex]
  if (!rival) return msgs

  if (rival.status === "contemplating") {
    return msgs
  }

  const pairs = getAvailableDiscoveryPairs(state, state.rivalSageIndex)
  if (pairs.length > 0) {
    const idx = Math.floor(Math.random() * pairs.length)
    const [a, b] = pairs[idx]
    rival.contemplation = {
      aspectA: a,
      aspectB: b,
      progressRequired: 4,
      progressCurrent: 0,
      expectedDiscoveryId: null,
    }
    rival.status = "contemplating"
    msgs.push(`Rival Sage is contemplating something...`)
  } else {
    const target = findBestHex(state, rival)
    if (target) {
      const path = simplePath(rival.q, rival.r, target.q, target.r)
      if (path.length > 1) {
        rival.q = path[1].q
        rival.r = path[1].r
        msgs.push(`Rival Sage moves toward new study grounds.`)
      }
    }
  }
  return msgs
}

function findBestHex(state: GameState, sage: SageUnit): { q: number; r: number } | null {
  let best: { q: number; r: number } | null = null
  let bestScore = -1
  for (const h of state.mapHexes.values()) {
    const dist = hexDist(h.q, h.r, sage.q, sage.r)
    if (dist > 4 || dist === 0) continue
    const aspectCount = h.aspects.filter(a => a.strength > 0.3).length
    const score = aspectCount * 10 - dist
    if (score > bestScore) {
      bestScore = score
      best = { q: h.q, r: h.r }
    }
  }
  return best
}

export function endTurn(state: GameState): string[] {
  if (state.phase !== "player") return ["Already resolving."]
  state.phase = "resolution"
  const msgs: string[] = []

  const resolved = resolveContemplations(state)
  msgs.push(...resolved)

  const rivalMsgs = rivalAct(state)
  msgs.push(...rivalMsgs)

  state.turn++
  state.phase = "player"

  if (state.discoveriesMade.length >= 10) {
    state.winner = 0
    msgs.push("You have achieved a Magnum Opus! Victory!")
  }

  return msgs.length > 0 ? msgs : ["Turn ends. Nothing new."]
}

export function hexDist(q1: number, r1: number, q2: number, r2: number): number {
  return (Math.abs(q1 - q2) + Math.abs(r1 - r2) + Math.abs((q1 + r1) - (q2 + r2))) / 2
}

function simplePath(fromQ: number, fromR: number, toQ: number, toR: number): { q: number; r: number }[] {
  const path: { q: number; r: number }[] = []
  let q = fromQ
  let r = fromR
  const maxSteps = 10
  for (let i = 0; i < maxSteps; i++) {
    path.push({ q, r })
    if (q === toQ && r === toR) break
    const dq = Math.sign(toQ - q)
    const dr = Math.sign(toR - r)
    if (dq !== 0 && dr !== 0) {
      if (Math.abs(toQ - q) >= Math.abs(toR - r)) q += dq
      else r += dr
    } else if (dq !== 0) q += dq
    else r += dr
  }
  return path
}
