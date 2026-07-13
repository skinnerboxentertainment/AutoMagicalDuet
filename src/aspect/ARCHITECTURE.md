# ASPECT — Architecture Map

## File Inventory

### `types.ts`
Core data types for the entire game. Every other file imports from here.

| Type | Purpose | Used By |
|------|---------|---------|
| `Terrain` | 7 hex terrain types (plains, forest, river, hills, desert, mountain, water) | map-data, hex-renderer, game-logic |
| `AspectInstance` | A single aspect on a hex (type + strength 0-1 + source string) | map-data, game-logic, hex-renderer |
| `HexTile` | One hex on the map — position, terrain, aspects, owner, render style | map-data, game-logic, hex-renderer, main-aspect |
| `SageUnit` | A sage — position, level, study radius, move range, contemplation state, domain | game-logic, hex-renderer, main-aspect |
| `Contemplation` | Active research — two aspects being combined, progress, expected discovery ID | game-logic |
| `Discovery` | A discoverable formula — inputs, prerequisites, turns required, map effects | discovery-pool, game-logic |
| `AspectChange` | How a discovery modifies the map — aspect type, strength, radius, terrain filter | discovery-pool, game-logic |
| `PopupData` | Transient overlay shown on discovery | game-logic, hex-renderer |
| `GameState` | Complete game state — turn, phase, map, sages, discoveries, arcana, winner | all modules |
| `MapCell` | Input format for map generation (before conversion to HexTile) | map-data |

### `map-data.ts`
Generates the 12×12 hex map. Single function `createMapCells()` returns `MapCell[]` with hardcoded terrain layout and aspect assignments by terrain type.

### `discovery-pool.ts`
The 15 discoverable formulas as a const array `DISCOVERIES`. Single query function `findDiscovery(a, b)` returns the matching `Discovery` or null.

Design reference: `NEWGAME-CONCEPT.md` §2 (Discovery Model), `EXAMPLE-CAMPAIGN.md` for chain examples.

### `game-logic.ts`
Pure functions — no PixiJS dependency, fully testable in isolation. All game state mutations happen here.

| Function | Design Ref | What It Does |
|----------|-----------|-------------|
| `createInitialState` | §4.1 | Builds initial GameState with two sages, empty discoveries |
| `getAspectsInRadius` | §2.3 | Collects all aspect types within a sage's study radius |
| `hasPrerequisitesMet` | §2.4 | Checks discovery prerequisites against known discoveries |
| `getAvailableDiscoveryPairs` | §2.5 | Filters valid pairs: in radius, not failed, prerequisites met |
| `tryContemplate` | §2.6 | Starts a sage on a contemplation. Returns message string |
| `resolveContemplations` | §4.4 | Advances all active contemplations by one turn. Completes if progress >= required |
| `applyDiscovery` | §2.7 | Applies a discovery's aspect changes to the map, levels the sage, grants arcana |
| `rivalAct` | §6 | AI: picks random valid pair or moves toward rich-hex area |
| `endTurn` | §4.3 | Resolution phase: resolve → rival act → turn++ → check victory |
| `movePlayerSage` | §1.2 | Moves player sage to target hex if within range and passable |
| `spendArcanaReveal` | §7.2 | Spends 10 arcana for a random available pair hint |
| `hexDist` | — | Hex axial distance (cube coordinate formula) |
| Constants | §4, §7 | `MAX_TURNS=30`, `ARCANA_REVEAL_COST=10`, `SAGE_MOVE_RANGE=3` |

### `hex-renderer.ts`
PixiJS v8 rendering. Takes a `() => GameState` getter and renders it to the canvas.

| Method | What It Draws |
|--------|--------------|
| constructor | Container setup, bottom bar, End Turn button, Reveal button, legend, map |
| `pixelCoords` | Axial hex → pixel coordinate conversion (pointy-top) |
| `buildMap` | Static hex terrain tiles + aspect labels (built once) |
| `render` | Full redraw: clears overlay, redraws study rings, sage dots, progress bars, markers, popups |
| `updateHover` | Persistent hover highlight graphic (updated independently, no flicker) |
| `renderPopup` | Discovery notification overlay |
| `renderGameOver` | Victory/defeat screen with score + Play Again |
| `renderTutorial` | 3-panel tutorial on first launch |
| `renderDiscoveryPanel` | Left sidebar showing discovered items with domain colors |
| `getHexAtPixel` | Pixel → hex lookup (nearest-center, returns axial coords) |
| Hit tests | `isEndTurnHit`, `isRevealHit`, `isRestartHit` — button boundary checks |

### `main-aspect.ts`
Application entry point. Wires PixiJS events to game logic. Owns the game loop.

| Function | Role |
|----------|------|
| `bootAspect` | Called from `main.ts`. Creates Application, calls `startNewGame` |
| `startNewGame` | Full reset: destroy old, create new Application, init map, create renderer, wire events |
| `handleClick` | All click dispatch: tutorial → buttons → game over → movement → aspect picking → contemplate |
| `handleEndTurn` | End turn with idle-sage confirmation guard |
| `destroyAspect` | Cleanup on game close |

### `sfx.ts`
Minimal Web Audio API sound effects. 6 functions: `sfxClick`, `sfxDiscovery`, `sfxEndTurn`, `sfxMove`, `sfxReveal`, `sfxGameOver`. Each creates an oscillator, plays for a few milliseconds, disconnects.

### `main.ts` (parent `src/` dir)
Bridge between the knowledge-encyclopedia HTML page and the game. Exports `launchAspectFromUI` which boots the game into a hidden container div.

---

## Data Flow

```
Click → main-aspect.handleClick(px, py)
  → renderer.isEndTurnHit | isRevealHit | isRestartHit
  → renderer.getHexAtPixel → get hex coords
  → hexDist → check study radius
  → tryContemplate | movePlayerSage
  → renderer.render()
  → game-logic.resolveContemplations → endTurn (on next turn)
  → victory check
```

## Test Surface

| Module | Coverage | Priority |
|--------|----------|----------|
| `game-logic.ts` | 0% — all pure functions, trivial to test | **Critical** |
| `discovery-pool.ts` | 0% — findDiscovery needs pair lookup tests | **Critical** |
| `hex-renderer.ts` | 0% — visual, needs Playwright screenshots | Low |
| `main-aspect.ts` | 0% — integration, hard to isolate | Low |
| `sfx.ts` | 0% — audio, needs manual verification | Low |
