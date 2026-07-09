# Sub Shooter — Full Game Spec

**Genre:** 2D side-scrolling underwater arcade shooter
**Target:** Complete, polished browser game
**Status:** 🔄 Design locked — implementing

---

## Core Identity

**You pilot a retro-adventure submarine through hostile waters.** Copper hull. Brass fittings. Teal glass cockpit. You're diving for treasure in a world that looks like a Jules Verne novel drawn by IREM's arcade team — dense pixel art, chunky explosions, mechanical menace, and a CRT glow.

The aesthetic is locked in `design/visual-tuner.md`. The general arcade craft language is in `design/aesthetic-styleguide.md`.

---

## Core Loop

1. Move the submarine in 4 directions inside the playfield (inertia-based, ~0.2s to max speed)
2. Hold or tap Space to fire forward torpedoes (cooldown, max 4 active)
3. Shoot patrol fish and mines before they reach you
4. Dodge hazards and collect treasure/fuel cans
5. Fuel drains continuously — at empty, hull takes periodic damage
6. Survive until 3 hull hits destroy the sub
7. Restart quickly and chase a higher score

---

## Visual Identity (locked)

See `design/visual-tuner.md` for exact specs. Summary:

| Element | Look |
|---------|------|
| Hero sub | Copper cigar hull, brass fittings, teal glass cockpit, cream tail fins, warm dark outlines. 2.24:1 aspect. Three large portholes, conning tower with curved periscope. |
| Enemies | Dieselpunk military — olive/dark steel, chunky silhouettes, exaggerated weapons |
| Background | Multi-layer parallax: far water gradient → mid ruins/wreckage → near bubbles/silt. Lower contrast than gameplay sprites. |
| Effects | White/yellow hot core explosions, orange body, cyan shock rings underwater. Chunky stepped pixel clusters. |
| UI | Compact arcade HUD: score, HP pips, fuel bar. Blocky bitmap text on dark navy panels. |
| CRT treatment | Subtle scanlines, low-opacity blue-green underwater grade, slight vignette, nearest-neighbor scaling |

---

## Gameplay Mechanics

### Player
- Acceleration/drag movement (max speed 260, accel 1400, drag 1800)
- 3 HP
- 1200ms invincibility after damage (sprite flash)
- Fires forward torpedoes only
- Holding Space auto-fires at cooldown rate (260ms)
- Bounded in playable area (Y: 80–520)

### Torpedoes
- Speed 520 px/s, lifetime 1200ms, max 4 active
- Destroy on first enemy/mine hit
- Score +50 per kill

### Enemies
**Patrol fish:** Sine-wave vertical drift, 1 HP, speed 120–220 (ramps)
**Mine:** Area denial, 1 HP, slower drift, cosmetic explosion only

### Collectibles
**Treasure chest:** +100 score, drifts left
**Fuel can:** Restores 20s fuel, guaranteed spawn when fuel < 35%

### Fuel
- Starts at 60s, drains 1/s
- Empty = 1 hull damage every 3s until refueled or dead
- Low warning below 20% (HUD color change)

### Spawning
- Active caps: fish 4, mines 3, treasure 3, fuel 1
- Spawn at screen width + 40, despawn at x < -80
- 2s initial grace, 1s damage grace (no mines after hit)
- Difficulty ramps every 20s (spawn intervals decrease, speed increases)

### Scenes
1. **Title** — "SUB SHOOTER — Press SPACE" (300ms input lockout)
2. **Game** — main loop
3. **Game Over** — final score, "Press R to restart"

### Config
33 tunable values in `assets/data/gameplay-config.json` — see file for exact defaults.

---

## Visual Effects Pipeline

Applied in order at the compositing layer:

1. **Render gameplay** — sprites at native resolution with nearest-neighbor
2. **Parallax background** — 2-3 layers scrolling at different speeds
3. **Underwater color grade** — low-opacity teal-blue overlay on world container (not HUD)
4. **Scanlines** — 1px dark lines every 2-3 screen pixels at 8-14% opacity
5. **Vignette** — subtle dark edge shadow
6. **Camera shake** — 2-5px mechanical displacement on impacts

All post-processing must preserve gameplay readability. HUD is exempt from color grade and scanlines.

---

## Audio (to implement)

4 procedural SFX via jsfxr (already wired in repo):
- **Shoot** — short percussive burst
- **Collect** — bright ascending chime
- **Hit** — low thud
- **Explosion** — layered noise burst

Background music: deferred from MVP.

---

## Tests

| File | Tests | Coverage |
|------|-------|----------|
| `tests/unit/gameplay/sub-player.test.ts` | 4 | Movement, damage, invincibility, death |
| `tests/unit/gameplay/fuel-manager.test.ts` | 7 | Drain, clamp, refill, low warning, damage ticks, reset |
| `tests/unit/gameplay/spawn-director.test.ts` | 4 | Caps, bounds, reset |
| `tests/unit/core/scene-manager.test.ts` | 5 | Scene lifecycle |
| `tests/unit/core/input-manager.test.ts` | 4 | Keyboard capture |
| `tests/narrative-core.test.ts` | 5 | Narrative engine |

**Total: 29 tests, all passing.**

---

## Assets to Generate

Using styleguide + tuner with gpt-image-2:

| Asset | Size | Prompt template in |
|-------|------|--------------------|
| Hero sub sprite sheet | 64x32 per frame | visual-tuner.md |
| Patrol fish | 48x24 per frame | aesthetic-styleguide.md |
| Mine | 24x24 | aesthetic-styleguide.md |
| Treasure chest | 20x20 | aesthetic-styleguide.md |
| Fuel can | 16x16 | aesthetic-styleguide.md |
| Explosion sheet | 64x64 per frame | aesthetic-styleguide.md |
| Background layer 1 (far) | 800x600 | aesthetic-styleguide.md |
| Background layer 2 (mid) | 800x600 | aesthetic-styleguide.md |
| HUD elements | Various | aesthetic-styleguide.md |

---

## Acceptance Criteria

- [ ] Sub moves in 4 directions with responsive inertia
- [ ] Space fires forward torpedoes with cooldown
- [ ] Holding Space auto-fires without exceeding max 4
- [ ] Fish and mines spawn from right, despawn left
- [ ] Torpedoes destroy fish and mines
- [ ] Player takes 1 damage from contact, invincibility prevents spam
- [ ] Treasure increases score once
- [ ] Fuel drains, refills, clamps, triggers low warning
- [ ] Empty fuel causes periodic hull damage
- [ ] Spawn director respects active caps and Y bounds
- [ ] Title, Game, Game Over flow correctly with input lockout
- [ ] Restart with R works
- [ ] Sprites render with nearest-neighbor (no blur)
- [ ] Scanlines and vignette visible but subtle
- [ ] Underwater color grade applied to world, not HUD
- [ ] `npm run build` passes
- [ ] `npm test` passes (29/29)
- [ ] Playwright screenshot confirms art, HUD, and CRT effects render

---

## Current Progress

| Area | Status |
|------|--------|
| Core gameplay (movement, combat, spawning) | ✅ Built |
| Fuel system | ✅ Built |
| 3 scenes with input lockout | ✅ Built |
| Config (33 values) | ✅ Built |
| Tests (29 passing) | ✅ Built |
| Aesthetic styleguide | ✅ Written |
| Visual tuner (retro-adventure lock) | ✅ Written |
| Hero sub concept art | ✅ Generated (3 variations) |
| Sprite generation | ⏳ Not started |
| Background parallax | ⏳ Not started |
| CRT effects (scanlines, grade, vignette) | ⏳ Not started |
| Audio SFX | ⏳ Not started |
| Playwright visual verification | ⏳ Not started |
