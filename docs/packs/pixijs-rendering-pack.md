---
name: pixijs-rendering-pack
when: "PixiJS v8 rendering, scene graph, sprites, graphics, assets, particles, shaders, filters, visual performance, or art-to-engine pipeline work is in scope."
triggers: "Touching src/rendering/**, PixiJS Application setup, scene containers, sprites, Graphics, Assets, Ticker, filters, shaders, particles, VFX, texture atlases, canvas input, or visual optimization."
---

# PixiJS Rendering Pack

## When to use

Use this pack for PixiJS v8 implementation and review: application setup, scene graph structure, sprites, graphics, text, assets, ticker loops, pointer events, filters, shaders, particles, batching, culling, and visual performance.

Use it with art direction when a feature needs visual hierarchy, palette consistency, asset specs, VFX budgets, or art pipeline decisions.

## Constraints

- Target PixiJS v8.
- Verify engine-specific APIs against the project's pinned PixiJS reference before relying on memory.
- Use `Assets` for loading; do not use removed loader patterns.
- Prefer `Container` for grouping and scene graph structure.
- Do not create sprites, graphics, particles, or textures inside hot update loops.
- Do not read pixels back from the GPU on the main-thread hot path.
- Rendering code should not own gameplay rules or mutate non-rendering game state directly.
- Asset names should follow `[category]_[name]_[variant]_[size].[ext]`.
- Visual systems need budgets: draw calls, texture memory, particles, shader cost, overdraw, and scene complexity.
- Visual decisions must serve the art bible, visual hierarchy, and gameplay readability.

## Patterns

- **Application**: initialize with v8 `Application` patterns and project renderer preferences. Keep setup isolated from gameplay systems.
- **Scene graph**: root on `app.stage`, logical groups as containers, stable z-ordering, and explicit culling for off-screen content.
- **Assets**: use `Assets` bundles/manifests/cache. Use cached texture names rather than raw paths scattered through code.
- **Sprites**: pool sprite-heavy effects and projectiles. Reuse textures from atlases.
- **Graphics**: use for prototypes, debug drawing, simple primitives, and procedural shapes. Replace repeated complex graphics with textures when needed.
- **Ticker**: use `app.ticker` or a project ticker abstraction with delta-time awareness. Use fixed timestep patterns for deterministic simulation where needed.
- **Events**: use PixiJS event modes, hit areas, and pointer events deliberately. Keep input routing separate from gameplay state mutation where practical.
- **Filters and shaders**: document parameters, visual intent, quality settings, and performance impact.
- **Particles and VFX**: define particle count limits, lifetime, spawn rate, pooling strategy, and fallback quality tier.
- **Batching**: use texture atlases, compatible blend modes, and stable render ordering to reduce draw calls.
- **Culling/LOD**: lazily create hidden/off-screen content and cull large scenes.
- **Art pipeline**: specify resolution, format, color profile, naming, texture/atlas budget, and import expectations for every asset category.
- **Visual hierarchy**: important gameplay information must have contrast, motion, size, placement, or lighting priority.

## Anti-patterns

- Mixing gameplay rules into rendering containers.
- Recreating textures or sprites every frame.
- Loading assets ad hoc from many gameplay files.
- Depending on deprecated PixiJS APIs or version-uncertain methods.
- Using particles, filters, or shaders without budgets.
- Making VFX obscure hitboxes, hazards, pickups, or UI.
- Ignoring atlas and blend mode compatibility until performance breaks.
- Treating placeholder art as exempt from naming, size, or pipeline standards when it enters source control.
- Changing renderer architecture for a single effect without an ADR-level discussion.

## Checklist

- PixiJS API usage matches v8 reference docs.
- Rendering setup is isolated and easy to initialize/destroy.
- Scene graph has clear root containers and ownership boundaries.
- Assets load through `Assets` and use stable keys.
- Textures are cached and reused.
- Sprite/particle-heavy systems use pooling.
- No object creation occurs in hot update loops unless measured and justified.
- Ticker usage handles delta time consistently.
- Pointer hit areas match visible affordances.
- Culling or lazy creation exists for off-screen or hidden content.
- Filters/shaders document parameters and performance cost.
- VFX has particle count, spawn rate, lifetime, and fallback limits.
- Draw call, texture memory, and frame-time budgets are known for the scene.
- Asset names follow project convention.
- Visual hierarchy makes hazards, player, goals, and UI readable.
- Browser verification includes canvas renders, assets visible, no blank scene, and no obvious overlap.

## References

- Source agents: `.opencode/agents/art-director.md`, `technical-artist.md`, `pixijs-specialist.md`.
- Project docs: `.opencode/docs/technical-preferences.md`, `.opencode/docs/pixijs-reference/VERSION.md` when available.
- PixiJS skills: `pixijs`, `pixijs-application`, `pixijs-assets`, `pixijs-scene-container`, `pixijs-scene-sprite`, `pixijs-scene-graphics`, `pixijs-events`, `pixijs-ticker`, `pixijs-filters`, `pixijs-custom-rendering`, `pixijs-performance`.
- Asset convention: `[category]_[name]_[variant]_[size].[ext]`.

## Escalation

- Pull in `game-design-pack` when rendering choices affect gameplay readability, player feedback, or target feel.
- Pull in `qa-testing-pack` for browser, screenshot, interaction, performance, or visual evidence.
- Escalate architecture changes such as renderer abstraction, asset pipeline rewrites, scene ownership changes, or cross-cutting performance budgets to the orchestrator.
- Escalate aesthetic direction conflicts to the art direction owner or user before implementation.
