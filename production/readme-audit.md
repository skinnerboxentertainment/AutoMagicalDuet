# README Audit — AutoMagicalDuet

**Date:** 2026-07-14
**Commit audited:** `eb0bd2c` (Prototype checkpoint: bug fixes, UI, tutorial, cleanup)

---

## 1. Repository Truth Today

| Fact | Current State |
|---|---|
| **Active project** | ASPECT — discovery-driven 4X / Sage Laboratory prototype |
| **Playable now** | 12×12 hex map, 2 Sages, 6 aspects, 15 discoveries, rival AI, tutorial |
| **Workflow** | Lean Consort Model: You (Director) + OpenCode (Builder) + Codex (Critic) |
| **Entry point** | `src/main.ts` → `src/aspect/main-aspect.ts` (boots ASPECT) |
| **Landing page** | Knowledge encyclopedia (64 chunks, 9 domains) with "Launch Game" button |
| **Engine** | `src/core/` — game-loop, scene-manager, input-manager, config, types |
| **Game code** | `src/aspect/` — hex-renderer, game-logic, map-data, discovery-pool, sfx |
| **Tests** | `tests/aspect-core.test.ts` (game-logic pure function tests) |
| **Design docs** | `design/` — lean-consort-model, aesthetic-styleguide, design-runlist, AUDIO-PIPELINE-PLAN, mvp-sub-shooter (historical) |

### Assets in `public/assets/`
- `banner.png` — keep (brand)
- `logo.png` — keep (brand)
- `screenshot-platformer.png` — **stale** (old platformer, no longer exists)
- `hero-sub.png`, `torpedo.png`, `patrol-fish.png`, `mine.png`, `armored-fish.png`, `boss-ironclaw.png`, `treasure.png`, `fuel-can.png`, `explosion.png` — **stale** (Sub Shooter sprites)
- `concept-military.png`, `concept-retro.png`, `concept-stealth.png` — **stale** (concept art from earlier phase)
- `hero-dish.png` — untracked, appears to be new

### Root-level assets
- `aspect-screenshot.png` — current ASPECT screenshot, **not referenced in README**

---

## 2. Stale README Content

### 2.1 "Games you can make" section (lines 26–43)
Shows a platformer screenshot with caption *"A platformer — collect gems, dodge enemies, reach the exit."* Followed by a table of 5 games (twin-stick shooter, breakout, submarine explorer, puzzle game, tic-tac-toe) that were built with earlier iterations. None of these exist in the current codebase.

**Fix:** Replace with ASPECT as the primary showcase. Move historical demos to a footnote.

### 2.2 "Your first magic trick" section (lines 46–66)
Tells the reader to open `assets/data/gameplay-config.json` and change `player_jump_velocity`. This file does not exist. The tutorial walks through platformer-specific JSON tweaks.

**Fix:** Replace with an ASPECT-specific first interaction — e.g., changing a discovery's required turns or starting aspects.

### 2.3 "Three paths" section (lines 70–102)
All paths (5-min config tweak, 1-hour level design, weekend invent-your-own) are based on the old platformer's data-driven JSON files.

**Fix:** Rewrite to describe how a new user would: (1) play ASPECT and change map generation parameters, (2) modify the discovery pool, (3) invent a new game concept and run it through the consort workflow.

### 2.4 "Quick start" footnote (line 166)
Says *"Click 'Launch Game' to play the platformer."* — wrong game.

### 2.5 Project layout (lines 186–199)
Shows `scenes/`, `gameplay/`, `audio/` — these directories were deleted in commit `b85d894`. Actual layout is `aspect/` and `core/`.

### 2.6 Badges (line 14–15)
- `games%20built-5` — only 1 active game (ASPECT). Sub Shooter and platformer are historical.
- `knowledge-63%20chunks` — index.html says 64. Actual count should be verified.

---

## 3. Content That Should Stay

- **"What is this?"** (lines 18–22) — correct framing of the human+two-AI workshop concept
- **"How the two AI helpers work"** (lines 106–133) — accurate role delegation (OpenCode builds, Codex sharpens)
- **"The project brain"** (lines 137–151) — knowledge encyclopedia concept is correct (update chunk count)
- **"Quick start"** (lines 155–164) — git clone + npm install + npm run dev still works
- **"What's under the hood"** (lines 170–180) — tech stack is accurate
- **License** — MIT, unchanged
- **Setup instructions** — still accurate

---

## 4. Revised Public Positioning

**One-liner:**
> You + two AI agents = discovery-driven game development. ASPECT is the current flagship — a 4X Sage Laboratory prototype built entirely through human-directed, multi-agent collaboration.

**Key messages to preserve or introduce:**
1. This is a **human-directed, multi-agent workflow** for making browser games
2. **You are the game director** — you decide what to build and whether it's fun
3. **OpenCode builds and implements** — architecture, coding, integration
4. **Codex critiques, researches, generates visual assets, and verifies in-browser**
5. **ASPECT is the current flagship prototype** — a turn-based 4X where you discover formulas by combining aspects on a hex map
6. The project is an **invitation to experiment** with practical, collaborative AI-assisted game development
7. Older prototypes (Sub Shooter, platformer) are part of the project's history, not its current showcase

---

## 5. Proposed Changes

### README.md
1. Replace banner image tag (keep banner, just update alt text)
2. Rewrite "Games you can make" → showcase ASPECT with `aspect-screenshot.png`
3. Rewrite "Your first magic trick" → ASPECT-specific interaction
4. Rewrite "Three paths" → ASPECT-aware paths
5. Update project layout to show actual directories
6. Fix badge counts (games built, knowledge chunks)
7. Update the quick-start footnote about what launches
8. Add a brief "History" or "Earlier Prototypes" section linking to git tags/commits for Sub Shooter and platformer

### Files not changed
- All source code, game logic, architecture
- Historical design docs in `design/`
- MIT license
- Existing setup/install instructions (verified they work)

### Assets not removed (but no longer featured)
- Old Sub Shooter sprites remain in `public/assets/` (not deleted — they're git history)
- `screenshot-platformer.png` remains but is no longer referenced in README

---

## 6. Gaps

- No ASPECT gameplay GIF or annotated screenshot in README (only `aspect-screenshot.png` exists)
- No "how to play ASPECT" quick reference — the tutorial is in-game only
- The `DoodleCiv/` sub-repo (ASPECT design docs, separate remote) is not discoverable from the main repo README
- No link to the design documents for contributors who want to understand ASPECT's design before they play

---

## 7. Actual Game Count

The README claims "5 games built" and lists platformer, twin-stick shooter, breakout, submarine explorer, puzzle, tic-tac-toe. The actual count across the workspace:

**In the main repo (AutoMagicalDuet git history):**
1. **Platformer** — Phase 1 proof-of-concept (commit history, now deleted in `b85d894`)
2. **Sub Shooter** — side-scrolling submarine arcade (commit history, replaced in `b85d894`)
3. **ASPECT** — current Sage Laboratory prototype (active)

**In separate workspace directories (AutoMagically_Refactor test suite — same workflow, different project):**
4. **Guess the Number** — `AutoMagically_Refactor/Test_1-Guess_the_Number/` (has src/)
5. **WarGames Tic Tac Toe** — `AutoMagically_Refactor/Test_2-WarGames Tic Tac Toe/` (has src/)
6. **Twin-stick shooter** — `AutoMagically_Refactor/TEST_5-TwinStickShooter/` (has src/)
7. **Krakout Clone (Breakout/Arkanoid)** — `AutoMagically_Refactor/Test_6-Krakout_Clone/` (has src/)
8. **Gold Diver (submarine explorer)** — `AutoMagically_Refactor/Test_8-Gold_Diver/` (has src/)

**Other workspace projects built with the same system:**
9. **AutoMagicalOutrunClone** — standalone OutRun-style driving game
10. **AutoMagically** — original game studio template

**Total: ~10 browser games built through this system.** The README's "5 games built" was an undercount even when written. The table of game types was aspirational marketing — it described what the system *could* produce, using the 3 built ones as anchors. The puzzle game and tic-tac-toe references were more about range than existing code. However, for README purposes the count should reflect verified games with source code in the workspace.
