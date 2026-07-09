# MVP: Sub Shooter — Side-Scrolling Submarine Game

**Genre:** 2D side-scrolling underwater arcade
**Target:** Working playable build in one pass
**Status:** Design locked ✅ (post-Attack phase)

---

## Core Fantasy

Pilot a nimble submarine through a hostile underwater corridor, shooting threats, slipping through mine fields, grabbing treasure, and managing fuel pressure long enough to push your score higher.

## MVP Pillars

1. **Readable arcade action** — the player always understands what hit them
2. **Crisp submarine control** — slight weight, never sluggish
3. **Fair pressure** — fuel and spawns create urgency without unavoidable failure
4. **Small scope** — one enemy, one hazard, two pickups, one endless scene

---

## Core Loop

1. Move submarine in 4 directions inside the playfield
2. Hold or tap Space to fire forward torpedoes
3. Shoot patrol fish and mines before they reach you
4. Dodge hazards and collect treasure/fuel
5. Survive until 3 hull hits or fuel starvation destroys the sub
6. Restart quickly and chase a higher score

---

## Player

- Moves with acceleration and drag
- Reaches max speed in ~0.2s, stops in ~0.25s after input release
- Bounded inside playable area (padding from edges)
- 3 HP
- 1200ms invincibility after damage
- Damage feedback: sprite flash/flicker
- Fires forward torpedoes only
- Holding Space auto-fires at cooldown rate
- Visual: procedural submarine shape (Graphics or simple sprite)

## Torpedoes

- Move rightward from sub nose
- Destroy on first enemy/mine hit
- Destroy when offscreen or after lifetime expires
- Max active: 4
- Score +50 per destroy

## Enemies and Hazards

**Patrol fish:**
- Spawns right of screen, moves left
- 1 HP
- Gentle sine-wave vertical drift so it's not a static lane
- Damages player on contact

**Mine:**
- Spawns right of screen, moves left with world scroll
- 1 HP
- Damages player on contact
- Explosion is visual/audio only (no area damage in MVP)

## Collectibles

**Treasure chest:**
- Drifts left with world
- Collected on player contact
- Score +100

**Fuel can:**
- Drifts left with world
- Restores 20s of fuel
- Cannot exceed max fuel

## Fuel

- Starts full (60s worth)
- Drains continuously at 1s/second
- Fuel can pickup restores 20s
- At 0 fuel: player takes 1 hull damage every 3s until refueled or dead
- Clamps at 0 and max
- Low-fuel warning below 20% (HUD color change)
- No surfacing in MVP — surface is visual only

## Spawning

- Spawn all objects at `screen_width + 40` in X
- Despawn at `x < -80`
- Playable Y range: 80–520 (excludes HUD area, surface band, seabed)
- Initial grace period: 2s after game start
- Damage grace: no new mines for 1s after player hit

**Active caps:**
- Fish: 4
- Mines: 3
- Treasure: 3
- Fuel cans: 1
- Torpedoes: 4

**Fairness rules:**
- Do not spawn two hazards with overlapping collision bounds
- Do not spawn a mine directly on top of a treasure or fuel can
- Guarantee a fuel can spawns if fuel is below 35% and no fuel can is active

## Difficulty Ramp

Every 20 seconds, ramp values toward their min/max:

| Value | Start | Min/Max | Unit |
|-------|-------|---------|------|
| Fish spawn interval | 1600 | 800 | ms |
| Mine spawn interval | 3500 | 1800 | ms |
| Enemy speed | 120 | 220 | px/s |

No new enemy types in MVP.

## HUD

- Score: top-left
- HP: 3 pips, top-right
- Fuel bar: horizontal bar, top-center
- Fuel bar changes color below 20%
- Invincibility: player sprite flashes

## Scenes

1. **Title** — "Sub Shooter – Press SPACE"
2. **Game** — main gameplay loop
3. **Game Over** — final score, "Press R to restart"

Scene transitions use key-press edge detection (not held state) to prevent immediate fire on scene entry.

## Audio

4 procedural SFX via jsfxr (already wired in the repo):
- Shoot
- Collect treasure
- Hit (player damage)
- Explosion (mine/fish destroyed)

## Config (`assets/data/gameplay-config.json`)

```json
{
  "player_max_speed": 260,
  "player_acceleration": 1400,
  "player_drag": 1800,
  "player_max_hp": 3,
  "player_invincibility_ms": 1200,
  "projectile_speed": 520,
  "projectile_cooldown_ms": 260,
  "projectile_lifetime_ms": 1200,
  "projectile_max_active": 4,
  "fuel_max": 60,
  "fuel_drain_per_second": 1,
  "fuel_refill_amount": 20,
  "fuel_empty_damage_interval_ms": 3000,
  "fuel_low_threshold": 0.2,
  "score_per_treasure": 100,
  "score_per_enemy": 50,
  "spawn_y_min": 80,
  "spawn_y_max": 520,
  "fish_max_active": 4,
  "mine_max_active": 3,
  "treasure_max_active": 3,
  "fuel_max_active": 1,
  "enemy_spawn_interval_start_ms": 1600,
  "enemy_spawn_interval_min_ms": 800,
  "mine_spawn_interval_start_ms": 3500,
  "mine_spawn_interval_min_ms": 1800,
  "treasure_spawn_interval_ms": 2400,
  "fuel_spawn_interval_ms": 8000,
  "enemy_speed_start": 120,
  "enemy_speed_max": 220,
  "world_scroll_speed": 90,
  "difficulty_ramp_seconds": 20
}
```

## Files to create/modify

**New files (~15):**
- `src/scenes/title-scene.ts`
- `src/scenes/game-scene.ts`
- `src/scenes/game-over-scene.ts`
- `src/gameplay/player.ts`
- `src/gameplay/enemy.ts`
- `src/gameplay/projectile.ts`
- `src/gameplay/treasure.ts`
- `src/gameplay/fuel-manager.ts`
- `src/gameplay/spawn-director.ts`
- `src/gameplay/ocean-background.ts`
- `src/gameplay/types.ts`
- `tests/unit/gameplay/player.test.ts`
- `tests/unit/gameplay/fuel-manager.test.ts`
- `tests/unit/gameplay/spawn-director.test.ts`
- `assets/data/gameplay-config.json`

**Modified:**
- `src/main.ts` — point to new scenes

## Tests

- Fuel clamps at 0 and max
- Empty fuel triggers hull damage
- Spawn director respects active caps
- Spawn director respects vertical bounds
- Damage invincibility prevents repeated hits
- Score increments once per collected/destroyed object
- Player movement and firing

## Acceptance Criteria

- [ ] Sub moves in 4 directions with bounded, responsive inertia
- [ ] Space fires forward torpedoes with cooldown
- [ ] Holding Space auto-fires without exceeding max torpedoes
- [ ] Fish and mines spawn from right, despawn left
- [ ] Torpedoes destroy fish and mines
- [ ] Player takes 1 damage from fish/mine contact
- [ ] Invincibility prevents repeated damage
- [ ] Treasure increases score once
- [ ] Fuel drains, refills, clamps, triggers low-fuel warning
- [ ] Empty fuel causes periodic hull damage
- [ ] Spawn director respects active caps and Y bounds
- [ ] Title, Game, Game Over flow correctly
- [ ] Scene transitions use edge-detection / input lockout
- [ ] Restart with R works
- [ ] `npm run build` passes (tsc + vite)
- [ ] `npm test` passes (vitest)
- [ ] Playwright screenshot confirms title, gameplay HUD, player, and spawned objects render
