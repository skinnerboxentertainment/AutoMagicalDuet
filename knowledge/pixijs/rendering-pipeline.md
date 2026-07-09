---
domain: pixijs
tags: [rendering, webgl, webgpu]
triggers: [src/core/**, src/rendering/**, src/main.ts]
related: [pixijs/shader-code-standards, qa-testing/performance-budgets]
---

# Rendering Pipeline

PixiJS v8 should own browser renderer selection and frame rendering. Project code should configure the application once, organize the scene graph, and avoid main-thread GPU stalls.

## Patterns

- Initialize PixiJS once in `main.ts` or equivalent app bootstrap.
- Prefer PixiJS v8 APIs documented for the pinned project version.
- Let PixiJS handle WebGL/WebGPU/Canvas fallback where possible.
- Use texture atlases and batching-friendly ordering for repeated sprites.
- Avoid GPU readbacks in gameplay or render hot paths.
- Profile rendering before optimizing and record before/after numbers.

## Anti-patterns

- Recreating the renderer during gameplay.
- Using v7 loader-era APIs in v8 code.
- Reading pixels from the GPU on the main thread during updates.
- Changing renderer architecture without an ADR or technical review.

## References

- `.opencode/agents/pixijs-specialist.md`
- `.opencode/agents/technical-artist.md`
- `.opencode/agents/engine-programmer.md`
