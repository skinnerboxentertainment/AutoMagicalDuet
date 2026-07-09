import type { Fish, Mine, Treasure, FuelCan, ArmoredFish, SubShooterConfig, WaveName } from "./types"

export function spawnFish(canvasW: number, yMin: number, yMax: number, speed: number): Fish {
  const yRange = yMax - yMin - 30
  return {
    x: canvasW + 40, y: yMin + 15 + Math.random() * yRange,
    width: 36, height: 18, active: true, hp: 1,
    baseY: 0, wobblePhase: Math.random() * Math.PI * 2, speed: speed + (Math.random() - 0.5) * 30,
  }
}

export function spawnArmoredFish(canvasW: number, yMin: number, yMax: number, speed: number): ArmoredFish {
  const yRange = yMax - yMin - 30
  return {
    x: canvasW + 40, y: yMin + 15 + Math.random() * yRange,
    width: 40, height: 22, active: true, hp: 2,
    baseY: 0, wobblePhase: Math.random() * Math.PI * 2, speed: speed + (Math.random() - 0.5) * 20,
  }
}

export function spawnMine(canvasW: number, yMin: number, yMax: number): Mine {
  const yRange = yMax - yMin - 30
  return {
    x: canvasW + 40, y: yMin + 15 + Math.random() * yRange,
    width: 24, height: 24, active: true, hp: 1, speed: 60 + Math.random() * 30,
  }
}

export function spawnTreasure(canvasW: number, yMin: number, yMax: number): Treasure {
  const yRange = yMax - yMin - 20
  return { x: canvasW + 40, y: yMin + 10 + Math.random() * yRange, width: 20, height: 20, active: true, collected: false, speed: 50 + Math.random() * 30 }
}

export function spawnFuelCan(canvasW: number, yMin: number, yMax: number): FuelCan {
  const yRange = yMax - yMin - 16
  return { x: canvasW + 40, y: yMin + 8 + Math.random() * yRange, width: 16, height: 16, active: true, collected: false, speed: 50 + Math.random() * 30 }
}

export function getWaveSpawnIntervals(wave: WaveName, timeInWave: number, config: SubShooterConfig) {
  const t = timeInWave
  let fishInterval: number, mineInterval: number, treasureInterval: number, fuelInterval: number
  let armoredInterval: number | null = null
  let fishSpeed: number

  switch (wave) {
    case "wave1":
      fishInterval = Math.max(1.8, 2.5 - t * 0.02)
      mineInterval = Math.max(3.5, 5.0 - t * 0.04)
      treasureInterval = 2.0
      fuelInterval = 8.0
      fishSpeed = 100 + t * 0.5
      break
    case "wave2":
      fishInterval = Math.max(1.4, 1.8 - t * 0.01)
      mineInterval = Math.max(2.5, 3.5 - t * 0.02)
      treasureInterval = 2.5
      fuelInterval = 7.0
      fishSpeed = 140 + t * 0.5
      armoredInterval = Math.max(5.0, 8.0 - t * 0.06)
      break
    case "wave3":
      fishInterval = Math.max(0.8, 1.2 - t * 0.008)
      mineInterval = Math.max(1.8, 2.5 - t * 0.015)
      treasureInterval = 3.5
      fuelInterval = 6.0
      fishSpeed = 190 + t * 0.3
      armoredInterval = Math.max(3.0, 4.0 - t * 0.02)
      break
    default:
      fishInterval = 99; mineInterval = 99; treasureInterval = 99; fuelInterval = 99;
      fishSpeed = 0
  }

  return { fishInterval, mineInterval, treasureInterval, fuelInterval, armoredInterval, fishSpeed }
}

export function getWaveDuration(wave: WaveName, config: SubShooterConfig): number {
  switch (wave) {
    case "wave1": return config.wave1_duration
    case "wave2": return config.wave2_duration
    case "wave3": return config.wave3_duration
    default: return 0
  }
}

export function nextWave(wave: WaveName): WaveName | null {
  if (wave === "wave1") return "wave2"
  if (wave === "wave2") return "wave3"
  if (wave === "wave3") return "boss"
  return null
}
