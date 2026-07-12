import type { MapCell, Terrain } from "./types"

const G: Terrain = "plains"
const F: Terrain = "forest"
const R: Terrain = "river"
const H: Terrain = "hills"
const D: Terrain = "desert"
const M: Terrain = "mountain"
const W: Terrain = "water"

const _terrain: Terrain[][] = [
  [M,H,H,F,F,F,F,F,F,R,R,W],
  [M,H,H,F,F,F,F,F,F,R,W,W],
  [H,H,H,G,G,G,F,F,R,R,W,W],
  [H,H,G,G,G,G,G,F,R,W,W,W],
  [G,G,G,G,G,G,G,G,R,W,W,W],
  [G,G,G,G,G,G,D,D,R,W,W,W],
  [G,G,G,G,D,D,D,D,G,W,W,W],
  [G,G,G,G,G,G,G,G,G,W,W,W],
  [F,F,F,G,G,G,G,G,G,W,W,W],
  [F,F,R,R,R,R,G,G,W,W,W,W],
  [F,R,R,R,R,R,R,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W],
]

export function createMapCells(): MapCell[] {
  const cells: MapCell[] = []
  for (let r = 0; r < 12; r++) {
    for (let q = 0; q < 12; q++) {
      const t = _terrain[r]?.[q] ?? G
      const aspects_: [string, number][] = []
      switch (t) {
        case "plains":
          aspects_.push(["earth", 0.6], ["fertile", 0.4])
          break
        case "forest":
          aspects_.push(["alive", 0.9], ["earth", 0.3])
          break
        case "river":
          aspects_.push(["water", 0.8], ["earth", 0.3])
          break
        case "hills":
          aspects_.push(["mineral", 0.7], ["earth", 0.5])
          break
        case "desert":
          aspects_.push(["heat", 0.7], ["earth", 0.2])
          break
        case "mountain":
          aspects_.push(["mineral", 0.3], ["earth", 0.4])
          break
        case "water":
          aspects_.push(["water", 0.2])
          break
      }
      cells.push({ q, r, terrain: t, aspects: aspects_ })
    }
  }
  return cells
}

export function key(q: number, r: number): string {
  return `${q},${r}`
}
