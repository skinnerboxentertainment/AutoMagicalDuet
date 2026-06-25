# OpenCode PixiJS Game Studio — Migration Architecture

## Overview

Derivative of [OpenCode Game Studios](https://github.com/Donchitos/Claude-Code-Game-Studios)
that replaces Godot/Unity/Unreal engine support with **PixiJS v8 + TypeScript**,
targeting the browser as the primary platform.

Keeps the full 73-command orchestration, 11 rules, sprint pipeline, and agent
coordination model. Only excises engine-specific cruft.

---

## Tech Stack

| Layer | Component | Purpose |
|-------|-----------|---------|
| **Renderer** | PixiJS v8 | 2D WebGL/WebGPU/Canvas rendering |
| **Language** | TypeScript (strict) | Type-safe game code |
| **Build** | Vite + tsc | Dev server, HMR, production bundle |
| **Physics** | Matter.js (optional) | 2D physics if needed |
| **Audio** | Howler.js (optional) | SFX/music playback |
| **State** | Custom DI / EventBus | Game state management |
| **Testing** | Vitest | Unit + integration tests |
| **Lint** | ESLint + Prettier | Code quality |
| **CI/CD** | GitHub Actions → static host | Deploy to Vercel/itch.io/Pages |

---

## Files to Excise (Delete)

### Engine Agent Files (15 files)
`.opencode/agents/`:
- `godot-specialist.md`
- `godot-gdscript-specialist.md`
- `godot-csharp-specialist.md`
- `godot-shader-specialist.md`
- `godot-gdextension-specialist.md`
- `unity-specialist.md`
- `unity-dots-specialist.md`
- `unity-shader-specialist.md`
- `unity-addressables-specialist.md`
- `unity-ui-specialist.md`
- `unreal-specialist.md`
- `ue-gas-specialist.md`
- `ue-blueprint-specialist.md`
- `ue-replication-specialist.md`
- `ue-umg-specialist.md`

### Engine Reference Docs (entire directory)
`docs/engine-reference/` — all 3 engine subdirs + README.md (~30 files)

---

## Files to Modify

### AGENTS.md
- Change "49 agents" → "34 agents"
- Remove engine specialist table
- Replace Technology Stack placeholder with PixiJS/TypeScript values
- Remove engine-specific bullet points
- Add note about PixiJS skills being loaded

### README.md
- Update badge from 49 → 34 agents
- Replace Engine Specialists section with PixiJS Web Stack section
- Update agent counts everywhere
- Replace Getting Started engine instructions with PixiJS instructions
- Remove engine-specific showcase

### opencode.json
- No structural changes needed (permissions are engine-agnostic)

### .opencode/docs/agent-roster.md
- Remove engine agents section (lines 54-89)
- Update total agent count

### .opencode/docs/directory-structure.md
- Remove `docs/engine-reference/` line
- Update to reflect web project layout (dist/, public/, etc.)

### .opencode/docs/technical-preferences.md
- Fill with PixiJS/TypeScript/Web defaults

### .opencode/rules/engine-code.md
- Rewrite examples from GDScript → TypeScript
- Keep zero-alloc, thread-safety, dependency direction rules
- Remove engine-specific references (RAII, GDScript examples)
- Add browser-specific rules (DOM interaction guard, memory profiling)

### .opencode/rules/shader-code.md
- Update for PixiJS GLSL/WGSL inline shaders
- Remove engine-specific file naming
- Add PixiJS Filter.from() and custom shader patterns

### .opencode/rules/gameplay-code.md
- Rewrite examples from GDScript → TypeScript
- Keep all rules (they're engine-agnostic)

### .opencode/rules/ui-code.md
- Add PixiJS-specific: Container-based UI, DOM overlay patterns

### .opencode/rules/test-standards.md
- Rewrite examples from GDScript → TypeScript/Vitest
- Keep all structure (arrange/act/assert)

### .opencode/commands/setup-engine.md
- Rewrite for PixiJS setup: install PixiJS, Vite, TS config
- Remove Godot/Unity/Unreal decision matrix
- Replace engine specialist routing with PixiJS + web specialist routing

### CLAUDE.md
- Update Technology Stack for PixiJS/TypeScript
- Remove Engine Version Reference import
- Point to PixiJS docs reference instead

---

## Files to Create

### .opencode/agents/pixijs-specialist.md
PixiJS specialist agent with knowledge of:
- PixiJS v8 Application, scene graph, sprites, graphics, text
- Performance optimization (batching, culling, texture atlases)
- GLSL/WGSL custom shaders and filters
- PixiJS event system, ticker, asset loading
- WebGL/WebGPU/Canvas environment detection

### .opencode/rules/web-code.md
New rules for general web/TypeScript code:
- No direct DOM manipulation outside designated UI layer
- Memory profiling for long-running sessions
- Bundle size budgets
- Canvas/WebGL context loss handling
- Service worker and PWA considerations

### .opencode/docs/pixijs-reference/VERSION.md
Pinned PixiJS version reference document.

---

## PixiJS Skills (Install via npx)

Run: `npx skills add https://github.com/pixijs/pixijs-skills`

Installs 25 skills covering:
pixijs, pixijs-accessibility, pixijs-application, pixijs-assets,
pixijs-blend-modes, pixijs-color, pixijs-core-concepts, pixijs-create,
pixijs-custom-rendering, pixijs-environments, pixijs-events, pixijs-filters,
pixijs-math, pixijs-migration-v8, pixijs-performance, pixijs-scene-container,
pixijs-scene-core-concepts, pixijs-scene-dom-container, pixijs-scene-gif,
pixijs-scene-graphics, pixijs-scene-mesh, pixijs-scene-particle-container,
pixijs-scene-sprite, pixijs-scene-text, pixijs-ticker

---

## New Directory Structure

```
/
├── AGENTS.md
├── opencode.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .opencode/
│   ├── agents/           # 34 agents (was 49)
│   ├── commands/         # 73 commands (unchanged)
│   ├── rules/            # 12 rules (was 11 — added web-code.md)
│   ├── skills/           # Original + 25 PixiJS skills
│   ├── docs/
│       ├── pixijs-reference/
│       ├── directory-structure.md
│       ├── technical-preferences.md
│       └── ...
├── src/
│   ├── main.ts           # Entry point
│   ├── core/             # Engine-layer code (app init, ticker, config)
│   ├── gameplay/         # Game logic, systems, components
│   ├── ai/               # NPC behavior (if applicable)
│   ├── networking/       # Multiplayer (if applicable)
│   ├── ui/               # HUD, menus, overlays
│   ├── rendering/        # Custom shaders, post-processing
│   └── tools/            # Dev tools, debug overlays
├── public/               # Static assets served directly
├── assets/               # Game assets (sprites, audio, data)
├── design/               # GDDs, narrative, levels
├── docs/                 # Architecture, ADRs
├── tests/                # Vitest suites
├── prototypes/           # Throwaway experiments
└── production/           # Sprints, milestones, releases
```

---

## Migration Order

1. Create new project directory and copy template
2. Install PixiJS skills
3. Delete 15 engine agent files and engine reference docs
4. Configure technical preferences, AGENTS.md, README.md, CLAUDE.md
5. Rewrite engine-code.md, shader-code.md for web stack
6. Create pixijs-specialist.md agent
7. Create web-code.md rules
8. Rewrite setup-engine.md for PixiJS
9. Initialize npm: Vite + TypeScript + PixiJS
10. First commit — "PixiJS Game Studio derivative"
