# Sub Shooter — Full Game Spec

**Genre:** 2D side-scrolling underwater arcade shooter
**Target:** Complete, polished browser game
**Status:** 🔄 Design locked — implementing

---

## Core Identity

**You pilot a retro-adventure submarine through hostile waters.** Copper hull. Brass fittings. Teal glass cockpit. You're diving for treasure in a world that looks like a Jules Verne novel drawn by IREM's arcade team — dense pixel art, chunky explosions, mechanical menace, and a CRT glow.

**Aesthetic documents:**
- General arcade craft language: `design/aesthetic-styleguide.md`
- Locked hero identity: `design/visual-tuner.md`

---

## Core Loop

1. Move submarine in 4 directions (inertia-based, ~0.2s to max speed)
2. Fire forward torpedoes (Space, cooldown-based, max 4 active)
3. Destroy enemies, dodge hazards, collect treasure and fuel
4. Fuel drains continuously — at empty, hull takes periodic damage
5. Survive 3 waves of increasing intensity, then face the boss
6. 3 hull hits destroy the sub — restart and chase a higher score

---

## Progression Structure

3 waves + boss. Each wave has escalating enemy composition:

### Wave 1 — "Shakedown" (0–40s)
**Tone:** Introduction. Sparse threats, generous fuel, learn the controls.
- Enemies: Single patrol fish, spaced wide. Occasional mine.
- Spawn intervals: Fish every 2.5s, mine every 5s
- Speed: Slow (fish 100 px/s)
- Fuel: Treasure-heavy spawns to build early confidence

### Wave 2 — "Deep Patrol" (40–90s)
**Tone:** Pressure builds. Mixed enemy types, tighter spacing, first armor.
- Enemies: Fish + mines + armored fish (2 HP, darker hull)
- Spawn intervals: Fish every 1.8s, mine every 3.5s
- Speed: Moderate (fish 140 px/s)
- New: Armored fish requires 2 torpedo hits. Visual cue: steel-gray hull, red stripe.

### Wave 3 — "The Gauntlet" (90–150s)
**Tone:** Maximum intensity. Everything at once, tight windows.
- Enemies: All types, faster, denser
- Spawn intervals: Fish every 1.2s, mine every 2.5s
- Speed: Fast (fish 190 px/s)
- Treasure spawns reduce — survival over greed

### Boss — "Ironclaw" (150s+)
**Tone:** Climactic. Everything you've learned, tested.
- After Wave 3 ends, a boss entrance warning: "INCOMING"
- Ironclaw: A massive steel submarine with:
  - Front armor plate (3 HP, blocks torpedoes until destroyed)
  - Side turrets (2 HP each, fire slow homing projectiles)
  - Weak point: exposed periscope/core after armor destroyed
- Phase 1: Front armor active. Turrets fire alternating shots.
- Phase 2: Armor destroyed. Core exposed. Turrets fire faster.
- Boss defeated = victory screen + score tally.

---

## Enemy Roster

### Patrol Fish (Wave 1, 2, 3)
**Visual:** Dieselpunk mechanical fish — olive steel body, riveted fins, red glass eye, small propeller tail.
- 1 HP
- Sine-wave vertical wobble (amplitude 15px, frequency 3Hz)
- Speed: 100 → 190 across waves
- Score: +50
**Role:** Baseline pressure. Forces the player to aim and prioritize.

### Mine (Wave 1, 2, 3)
**Visual:** Spherical iron ball with spikes, rusty chains, blinking red light center.
- 1 HP
- Stationary in screen space (scrolls left with world)
- Explodes on contact (cosmetic only — no area damage in MVP)
- Score: +50
**Role:** Area denial. Creates spatial puzzles with treasure/fuel placement.

### Armored Fish (Wave 2, 3)
**Visual:** Same silhouette as patrol fish but bulkier — dark gunmetal gray hull, thick armored plates, red warning stripe across the body, yellow glowing eye.
- 2 HP (needs 2 torpedo hits)
- Same movement as patrol fish but slightly slower (compensated by HP)
- Score: +100
**Role:** Introduces damage gates. Player must decide: two shots on one target or spread fire.

### Ironclaw Boss (Wave 3 boss)
**Visual:** Massive dieselpunk battle sub — dark steel hull, riveted plates, triple torpedo tubes on each side, armored prow with a painted jaw/tooth design, brass periscope array on top, red hazard stripes. Blocky and menacing, fills ~30% of screen width.

**Structure:**
| Part | HP | Behavior |
|------|----|----------|
| Front armor plate | 3 | Blocks all torpedoes to the core. Destroy to expose weak point. |
| Left turret | 2 | Fires slow homing projectile every 2s. Tracks player Y. |
| Right turret | 2 | Fires slow homing projectile every 2.5s. Alternates with left. |
| Core (exposed) | 5 | Only vulnerable after armor destroyed. Ends boss on destruction. |

**Phase 1 (armor intact):** Turrets fire alternating homing shots every 1.5s combined. Armor absorbs torpedoes. Visual: sparks on armor hits, no damage to core.
**Phase 2 (armor destroyed):** Core exposed, both turrets fire every 1.2s combined. Boss flashes red. Kill core to win.

**Score:** +500 for boss kill.

---

## Scoring and Tension

| Action | Score | Purpose |
|--------|-------|---------|
| Patrol fish kill | +50 | Baseline reward |
| Mine destroy | +50 | Same as fish |
| Armored fish kill | +100 | Risk/reward for tougher target |
| Treasure collect | +100 | Primary economy driver |
| Boss kill | +500 | Climactic payoff |

**Tension drivers (stacking):**
1. **Fuel drain** — constant pressure to collect fuel cans
2. **Spawn density** — increasing enemies over time
3. **Armored enemies** — forces multiple shots per target
4. **Boss phases** — changes behavior mid-fight
5. **3-HP limit** — every hit matters, mistakes compound

**Tension release:**
1. Treasure collection dopamine spike
2. Fuel can relief when low
3. Wave transition brief pause
4. Boss kill catharsis

---

## Visual Identity (locked)

See `design/visual-tuner.md` for exact specs and hex palette.

| Element | Look |
|---------|------|
| Hero sub | Copper cigar hull, brass fittings, teal glass cockpit, cream tail fins, warm dark outlines. 2.24:1 aspect. Three large portholes, conning tower with curved periscope. |
| Patrol fish | Olive steel, riveted fins, red glass eye, propeller tail |
| Armored fish | Dark gunmetal, steel plates, red stripe, yellow eye |
| Mine | Spiked iron ball, rusty chains, red blinking light |
| Ironclaw boss | Dark steel battle sub, prow jaw design, triple torpedo tubes, brass periscope array |
| Treasure | Gold coin or jewel chest, bright yellow/gold/white |
| Fuel can | Bright red/orange drum with fuel symbol |
| Background | Multi-layer parallax: far water gradient → mid ruins/wreckage → near bubbles/silt |
| Effects | White/yellow hot core explosions, orange body, cyan shock rings underwater |
| UI | Compact arcade HUD on dark navy panels. Blocky bitmap text. |
| CRT treatment | Subtle scanlines (1px every 3px, 10% opacity), low-opacity blue-green underwater grade, vignette, nearest-neighbor scaling |

---

## Gameplay Mechanics

### Player
- Acceleration/drag movement (max speed 260, accel 1400, drag 1800)
- 3 HP
- 1200ms invincibility after damage (sprite flash)
- Forward torpedoes only. Holding Space auto-fires at 260ms cooldown.
- Bounded in playable area (Y: 80–520)

### Torpedoes
- Speed 520 px/s, lifetime 1200ms, max 4 active
- Destroy on first enemy hit. No piercing in MVP.
- Score +50 per enemy destroyed via torpedo

### Fuel
- Starts at 60s, drains 1/s
- Fuel can restores 20s (guaranteed spawn when < 35%)
- Empty fuel = 1 hull damage every 3s until refueled or dead
- Low warning below 20% (HUD bar changes color)

### Spawning Rules
- Spawn at `screen_width + 40`, despawn at `x < -80`
- 2s initial grace period at game start
- 1s damage grace (no mines after player hit)
- Fuel can guarantee: if fuel < 35% and no fuel can active, spawn one immediately

**Active Caps:**
| Entity | Max |
|--------|-----|
| Patrol fish | 4 |
| Armored fish | 2 (Wave 2+ only) |
| Mines | 3 |
| Treasure | 3 |
| Fuel cans | 1 |
| Torpedoes | 4 |
| Boss turret projectiles | 4 |

### Wave Spawn Tables

**Wave 1:**
```
Fish:     interval 2.5s → 1.8s (ramps over wave)
Mine:     interval 5.0s → 3.5s
Treasure: interval 2.0s
Fuel:     interval 8.0s, guarantee at < 35%
Armored:  none
```

**Wave 2:**
```
Fish:     interval 1.8s → 1.4s
Mine:     interval 3.5s → 2.5s
Treasure: interval 2.5s
Fuel:     interval 7.0s, guarantee at < 35%
Armored:  interval 8.0s → 5.0s, max 2 active
```

**Wave 3:**
```
Fish:     interval 1.2s → 0.8s
Mine:     interval 2.5s → 1.8s
Treasure: interval 3.5s (greed tax)
Fuel:     interval 6.0s, guarantee at < 40%
Armored:  interval 4.0s → 3.0s, max 3 active
```

**Boss:** Normal spawning stops. Only boss and its turret projectiles active.

---

## Visual Effects Pipeline

Applied in order at compositing layer. HUD is exempt.

1. **Background layers** (2–3 parallax, rendered first)
2. **Gameplay sprites** (hero, enemies, pickups, torpedoes)
3. **Explosion effects** (sprite sheets, additive blending for hot cores)
4. **Underwater color grade** (low-opacity teal-blue overlay on world container only)
5. **Scanlines** (1px dark lines every 3px, ~10% opacity, full screen)
6. **Vignette** (subtle dark edges, full screen)
7. **Camera shake** (2–5px displacement on boss hits and player damage)
8. **HUD** (rendered last, no effects applied)

---

## Audio (to implement)

4 procedural SFX via jsfxr:
- **Shoot** — short percussive burst (rapid fire)
- **Collect** — bright ascending chime (treasure/fuel)
- **Hit** — low thud (player damage)
- **Explosion** — layered noise burst (enemy destroyed)
- **Boss warning** — descending tone (boss entrance)

Music: deferred from MVP.

---

## Scenes

1. **Title** — "SUB SHOOTER" + "Press SPACE" (300ms input lockout)
2. **Wave announcement** — "WAVE 1/2/3" + "INCOMING" for boss (1.5s overlay)
3. **Game** — main gameplay loop
4. **Victory** — boss defeated, final score, "Press R to play again"
5. **Game Over** — destroyed in action, final score, "Press R to restart"

---

## Tests

| File | Tests | Coverage |
|------|-------|----------|
| `tests/unit/gameplay/sub-player.test.ts` | 4 | Movement, damage, invincibility, death |
| `tests/unit/gameplay/fuel-manager.test.ts` | 7 | Drain, clamp, refill, low warning, damage ticks, reset |
| `tests/unit/gameplay/spawn-director.test.ts` | 4 | Caps, bounds, wave spawning, reset |
| `tests/unit/gameplay/boss.test.ts` | 4 | Boss phases, part destruction, victory condition |
| `tests/unit/core/scene-manager.test.ts` | 5 | Scene lifecycle |
| `tests/unit/core/input-manager.test.ts` | 4 | Keyboard capture |
| `tests/narrative-core.test.ts` | 5 | Narrative engine |
| **Total** | **33** | |

---

## Assets to Generate (via gpt-image-2)

Using `design/aesthetic-styleguide.md` + `design/visual-tuner.md`:

| Asset | Size | Purpose |
|-------|------|---------|
| Hero sub | 64x32 per frame | Player sprite sheet (idle, thrust, damage) |
| Patrol fish | 48x24 per frame | Standard enemy |
| Armored fish | 48x24 per frame | Wave 2+ enemy (2 HP) |
| Mine | 24x24 per frame | Stationary hazard |
| Ironclaw boss | 192x96+ | Multi-part boss sprites |
| Ironclaw armor | 48x32 | Destructible front plate |
| Turret projectile | 8x8 | Homing shot |
| Treasure chest | 20x20 | Collectible |
| Fuel can | 16x16 | Collectible |
| Torpedo | 12x4 | Player projectile |
| Explosion | 64x64 per frame | Enemy death VFX |
| Boss explosion | 96x96 per frame | Boss death VFX |
| Background far | 800x600 | Deep water gradient |
| Background mid | 800x600 | Ruins/wreckage |
| HUD frame | various | Score panel, fuel bar, HP pips |

---

## Acceptance Criteria

- [ ] 3 waves each feel distinct in difficulty and composition
- [ ] Boss fight has 2 phases with different behavior
- [ ] Armored fish require 2 hits and are visually distinguishable
- [ ] Fuel creates pressure but does not feel unfair (guaranteed spawns)
- [ ] Sprites render with nearest-neighbor (no blur)
- [ ] Scanlines and vignette visible but subtle
- [ ] Underwater color grade applied to world, not HUD
- [ ] Wave announcement overlay appears between waves
- [ ] Victory screen on boss kill
- [ ] `npm run build` passes
- [ ] `npm test` passes (33/33)
- [ ] Playwright screenshot confirms art, HUD, and CRT effects render

---

## Current Progress

| Area | Status |
|------|--------|
| Core movement + combat | ✅ Built |
| Fuel system | ✅ Built |
| 3 scenes with input lockout | ✅ Built |
| Config (33 values) | ✅ Built |
| Tests (29 passing, need boss tests) | 🟡 29/33 |
| Aesthetic styleguide | ✅ Written |
| Visual tuner (retro-adventure lock) | ✅ Written |
| Hero sub concept art | ✅ Generated (3 variations) |
| Enemy roster expansion | ⏳ Not started |
| Wave progression system | ⏳ Not started |
| Boss fight | ⏳ Not started |
| Sprite generation | ⏳ Not started |
| Background parallax | ⏳ Not started |
| CRT effects (scanlines, grade, vignette) | ⏳ Not started |
| Audio SFX | ⏳ Not started |
| Playwright visual verification | ⏳ Not started |
