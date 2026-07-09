# Events Log

## 2026-07-08
- Phase 0: Build fixed (npm install, tsc, vite, vitest all green).
- Phase 1: Working platformer game generated from spec (20/20 tests).
- Phase 2: Agent system redesign.
- Lean Consort Model designed and locked (OpenCode + Codex).
- ADR-0001: Adopt Lean Consort Model, deprecate 36-agent system.
- Knowledge packs extracted: game-design, pixijs-rendering, qa-testing, genre-platformer.
- AGENTS.md rewritten to reflect Lean Consort Model.
- opencode.json updated to reference new packs instead of 36-agent system.
- Remaining packs to extract: architecture, performance, audio (extracted when needed).
- Git checkpoint created.
- Phase 3: Art + Visual Consort completed.
- 6 sprites generated and integrated (player, platform, gem, enemy, exit, background).
- PixiJS manifest + texture pipeline wired (Assets.init, loadBundle, Sprite/TilingSprite).
- Production build verified (assets in dist/, game renders correctly).
- Visual verification screenshot: production/screenshot-production.png.
- Dev server: http://127.0.0.1:5173 (dev) / http://127.0.0.1:4173 (production preview).
