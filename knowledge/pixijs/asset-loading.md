---
domain: pixijs
tags: [assets, bundles, manifest]
triggers: [src/assets/**, src/scenes/**, assets/**, public/**]
related: [architecture/resource-cleanup, pixijs/rendering-pipeline]
---

# Asset Loading

Use PixiJS v8 `Assets` with scene-level bundles. Load during boot or scene entry, never inside frame updates.

## Patterns

- Initialize `Assets` with a manifest such as `assets/manifest.json`.
- Load one bundle per scene in `scene.enter()` or during a loading scene.
- Keep a shared core bundle for fonts and common UI/player assets.
- Use spritesheet JSON files for multi-frame sprites and variants.
- Put fixed-URL files such as manifests in `public/`; import Vite-processed textures, fonts, spritesheets, and data from source when bundling is desired.

## Anti-patterns

- `Assets.load` inside `update()`.
- PixiJS v7 `Loader` or `app.loader`.
- Loading the entire game asset set at boot by default.
- Importing hashed runtime assets from `public/`.

## References

- `.opencode/skills/automagically-assets-and-build/SKILL.md`
- `.opencode/agents/pixijs-specialist.md`
