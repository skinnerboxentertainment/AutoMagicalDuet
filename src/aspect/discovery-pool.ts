import type { Discovery } from "./types"

export const DISCOVERIES: Discovery[] = [
  {
    id: "irrigation",
    name: "Irrigation",
    description: "Water + Earth. The riverbanks bloom with new life.",
    inputs: ["water", "earth"],
    prerequisites: [],
    turnsRequired: 3,
    domain: "vital",
    unlock: "farm",
    aspectChanges: [
      { aspectType: "fertile", strength: 0.6, radius: 2, terrainFilter: "river" },
    ],
  },
  {
    id: "tillage",
    name: "Tillage",
    description: "Earth + Fertile. The soil is ready for planting.",
    inputs: ["earth", "fertile"],
    prerequisites: ["irrigation"],
    turnsRequired: 3,
    domain: "vital",
    unlock: "granary",
    aspectChanges: [
      { aspectType: "fertile", strength: 0.3, radius: 2, terrainFilter: "plains" },
    ],
  },
  {
    id: "selective_cultivation",
    name: "Selective Cultivation",
    description: "Fertile + Alive. Wild growth becomes tame harvest.",
    inputs: ["fertile", "alive"],
    prerequisites: ["tillage"],
    turnsRequired: 3,
    domain: "vital",
    unlock: "grove",
    aspectChanges: [
      { aspectType: "alive", strength: 0.3, radius: 2, terrainFilter: "forest" },
    ],
  },
  {
    id: "smelting",
    name: "Smelting",
    description: "Heat + Mineral. Ore yields its metal to the forge.",
    inputs: ["heat", "mineral"],
    prerequisites: [],
    turnsRequired: 4,
    domain: "material",
    unlock: "forge",
    aspectChanges: [
      { aspectType: "metal", strength: 0.7, radius: 2, terrainFilter: "hills" },
    ],
  },
  {
    id: "bronze_working",
    name: "Bronze Working",
    description: "Metal + Heat. Stronger tools, stronger arms.",
    inputs: ["metal", "heat"],
    prerequisites: ["smelting"],
    turnsRequired: 4,
    domain: "material",
    unlock: "spearman",
    aspectChanges: [
      { aspectType: "industry", strength: 0.4, radius: 2, terrainFilter: "hills" },
    ],
  },
  {
    id: "stonecutting",
    name: "Stonecutting",
    description: "Earth + Mineral. The mountain yields its bones.",
    inputs: ["earth", "mineral"],
    prerequisites: [],
    turnsRequired: 3,
    domain: "material",
    unlock: "quarry",
    aspectChanges: [
      { aspectType: "mineral", strength: 0.2, radius: 2, terrainFilter: "hills" },
    ],
  },
  {
    id: "herbalism",
    name: "Herbalism",
    description: "Alive + Water. The forest gives its remedies.",
    inputs: ["alive", "water"],
    prerequisites: [],
    turnsRequired: 3,
    domain: "vital",
    unlock: "herbalist",
    aspectChanges: [
      { aspectType: "alive", strength: 0.2, radius: 1, terrainFilter: "forest" },
    ],
  },
  {
    id: "pottery",
    name: "Pottery",
    description: "Water + Fertile. Clay takes shape beneath the hand.",
    inputs: ["water", "fertile"],
    prerequisites: [],
    turnsRequired: 3,
    domain: "vital",
    unlock: "pottery",
    aspectChanges: [
      { aspectType: "fertile", strength: 0.2, radius: 1, terrainFilter: "river" },
    ],
  },
  {
    id: "masonry",
    name: "Masonry",
    description: "Earth + Industry. The foundation is laid.",
    inputs: ["earth", "industry"],
    prerequisites: ["stonecutting", "bronze_working"],
    turnsRequired: 4,
    domain: "material",
    unlock: "walls",
    aspectChanges: [
      { aspectType: "industry", strength: 0.3, radius: 1, terrainFilter: "plains" },
    ],
  },
  {
    id: "astrology",
    name: "Astrology",
    description: "Heat + Alive. The stars speak of seasons and omens.",
    inputs: ["heat", "alive"],
    prerequisites: [],
    turnsRequired: 4,
    domain: "mystic",
    unlock: "observatory",
    aspectChanges: [
      { aspectType: "sacred", strength: 0.5, radius: 1, terrainFilter: "desert" },
    ],
  },
  {
    id: "shamanism",
    name: "Shamanism",
    description: "Alive + Fertile. The spirit in the land awakens.",
    inputs: ["alive", "fertile"],
    prerequisites: ["herbalism"],
    turnsRequired: 3,
    domain: "mystic",
    unlock: "shrine",
    aspectChanges: [
      { aspectType: "sacred", strength: 0.4, radius: 2, terrainFilter: "forest" },
    ],
  },
  {
    id: "geology",
    name: "Geology",
    description: "Mineral + Water. The earth's veins are mapped.",
    inputs: ["mineral", "water"],
    prerequisites: ["stonecutting"],
    turnsRequired: 4,
    domain: "material",
    unlock: "prospect",
    aspectChanges: [
      { aspectType: "mineral", strength: 0.3, radius: 3, terrainFilter: "hills" },
    ],
  },
  {
    id: "husbandry",
    name: "Husbandry",
    description: "Alive + Earth. The wild is tamed to the plow.",
    inputs: ["alive", "earth"],
    prerequisites: ["tillage"],
    turnsRequired: 3,
    domain: "vital",
    unlock: "pasture",
    aspectChanges: [
      { aspectType: "alive", strength: 0.2, radius: 2, terrainFilter: "plains" },
    ],
  },
  {
    id: "charcoal",
    name: "Charcoal",
    description: "Heat + Fertile. The kiln transforms earth into fire.",
    inputs: ["heat", "fertile"],
    prerequisites: [],
    turnsRequired: 3,
    domain: "material",
    unlock: "charcoal_pit",
    aspectChanges: [
      { aspectType: "heat", strength: 0.3, radius: 1, terrainFilter: "forest" },
    ],
  },
  {
    id: "writing",
    name: "Writing",
    description: "Water + Mineral. The ink meets the stone.",
    inputs: ["water", "mineral"],
    prerequisites: [],
    turnsRequired: 4,
    domain: "civic",
    unlock: "scriptorium",
    aspectChanges: [
      { aspectType: "sacred", strength: 0.2, radius: 2, terrainFilter: "plains" },
    ],
  },
]

export function findDiscovery(a: string, b: string): Discovery | null {
  const pair = [a, b].sort()
  for (const d of DISCOVERIES) {
    const dp = [d.inputs[0], d.inputs[1]].sort()
    if (dp[0] === pair[0] && dp[1] === pair[1]) return d
  }
  return null
}
