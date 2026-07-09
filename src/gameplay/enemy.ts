import type { Fish, Mine, SubShooterConfig, DifficultyState } from "./types"

export function spawnFish(canvasW: number, config: SubShooterConfig, diff: DifficultyState): Fish {
  const yRange = config.spawn_y_max - config.spawn_y_min - 30
  return {
    x: canvasW + 40,
    y: config.spawn_y_min + 15 + Math.random() * yRange,
    width: 36,
    height: 18,
    active: true,
    hp: 1,
    baseY: 0,
    wobblePhase: Math.random() * Math.PI * 2,
    speed: diff.enemySpeed + (Math.random() - 0.5) * 30,
  }
}

export function spawnMine(canvasW: number, config: SubShooterConfig): Mine {
  const yRange = config.spawn_y_max - config.spawn_y_min - 30
  return {
    x: canvasW + 40,
    y: config.spawn_y_min + 15 + Math.random() * yRange,
    width: 24,
    height: 24,
    active: true,
    hp: 1,
    speed: 60 + Math.random() * 30,
  }
}

export function updateFish(fish: Fish, dt: number, time: number): void {
  fish.x -= fish.speed * dt
  fish.y = fish.baseY + Math.sin(time * 3 + fish.wobblePhase) * 15
  if (fish.x < -80) fish.active = false
}

export function updateMine(mine: Mine, dt: number): void {
  mine.x -= mine.speed * dt
  if (mine.x < -80) mine.active = false
}

export function spawnTreasure(canvasW: number, config: SubShooterConfig) {
  const yRange = config.spawn_y_max - config.spawn_y_min - 20
  return {
    x: canvasW + 40,
    y: config.spawn_y_min + 10 + Math.random() * yRange,
    width: 20,
    height: 20,
    active: true,
    collected: false,
    speed: 50 + Math.random() * 30,
  }
}

export function spawnFuelCan(canvasW: number, config: SubShooterConfig) {
  const yRange = config.spawn_y_max - config.spawn_y_min - 16
  return {
    x: canvasW + 40,
    y: config.spawn_y_min + 8 + Math.random() * yRange,
    width: 16,
    height: 16,
    active: true,
    collected: false,
    speed: 50 + Math.random() * 30,
  }
}
