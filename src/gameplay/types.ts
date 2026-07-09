export interface SubShooterConfig {
  player_max_speed: number; player_acceleration: number; player_drag: number
  player_max_hp: number; player_invincibility_ms: number
  projectile_speed: number; projectile_cooldown_ms: number; projectile_lifetime_ms: number; projectile_max_active: number
  fuel_max: number; fuel_drain_per_second: number; fuel_refill_amount: number
  fuel_empty_damage_interval_ms: number; fuel_low_threshold: number
  score_per_treasure: number; score_per_enemy: number; score_per_armored: number; score_per_boss: number
  spawn_y_min: number; spawn_y_max: number
  fish_max_active: number; armored_max_active: number; mine_max_active: number
  treasure_max_active: number; fuel_max_active: number
  enemy_spawn_interval_start_ms: number; enemy_spawn_interval_min_ms: number
  mine_spawn_interval_start_ms: number; mine_spawn_interval_min_ms: number
  treasure_spawn_interval_ms: number; fuel_spawn_interval_ms: number
  enemy_speed_start: number; enemy_speed_max: number
  world_scroll_speed: number; difficulty_ramp_seconds: number
  wave1_duration: number; wave2_duration: number; wave3_duration: number
}

export interface Bounds { x: number; y: number; width: number; height: number }
export interface Entity { x: number; y: number; width: number; height: number; active: boolean }

export interface Fish extends Entity { hp: number; baseY: number; wobblePhase: number; speed: number }
export interface ArmoredFish extends Entity { hp: number; baseY: number; wobblePhase: number; speed: number }
export interface Mine extends Entity { hp: number; speed: number }
export interface ProjectileEnt extends Entity { speed: number; lifetime: number }
export interface Treasure extends Entity { collected: boolean; speed: number }
export interface FuelCan extends Entity { collected: boolean; speed: number }

export type WaveName = "wave1" | "wave2" | "wave3" | "boss"
export type GameState = "playing" | "game-over" | "victory"

export interface SpawnTimers { fish: number; mine: number; treasure: number; fuel: number; armored: number }

export interface BossPart {
  x: number; y: number; width: number; height: number; hp: number; maxHp: number; active: boolean
  destroyed: boolean; key: string
}

export interface BossProjectile { x: number; y: number; vx: number; vy: number; active: boolean; radius: number }
