export type Terrain = "plains" | "forest" | "river" | "hills" | "desert" | "mountain" | "water"

export interface AspectInstance {
  type: string
  strength: number
  source: string
}

export interface HexTile {
  q: number
  r: number
  terrain: Terrain
  aspects: AspectInstance[]
  owner: number | null
  style: "normal" | "study" | "selected" | "validPair"
}

export interface SageUnit {
  id: string
  owner: number
  q: number
  r: number
  level: number
  studyRadius: number
  moveRange: number
  status: "idle" | "contemplating" | "moving"
  contemplation: Contemplation | null
  domain: string | null
}

export interface Contemplation {
  aspectA: string
  aspectB: string
  progressRequired: number
  progressCurrent: number
  expectedDiscoveryId: string | null
}

export interface Discovery {
  id: string
  name: string
  description: string
  inputs: [string, string]
  prerequisites: string[]
  turnsRequired: number
  aspectChanges: AspectChange[]
  unlock: string | null
  domain: string
}

export interface AspectChange {
  aspectType: string
  strength: number
  radius: number
  terrainFilter: string | null
}

export interface PopupData {
  title: string
  description: string
  domain: string
}

export interface GameState {
  turn: number
  phase: "player" | "resolution"
  mapHexes: Map<string, HexTile>
  sages: SageUnit[]
  playerSageIndex: number
  rivalSageIndex: number
  discoveriesMade: string[]
  rivalDiscoveryCount: number
  failedPairs: string[]
  arcana: number
  message: string
  popup: PopupData | null
  winner: number | null
}

export interface MapCell {
  q: number
  r: number
  terrain: Terrain
  aspects: [string, number][]
}
