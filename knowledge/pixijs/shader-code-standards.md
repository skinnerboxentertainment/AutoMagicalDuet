---
domain: pixijs
tags: [shaders, filters, performance]
triggers: [assets/shaders/**, src/rendering/**]
related: [pixijs/rendering-pipeline, qa-testing/performance-budgets]
---

# Shader Code Standards

Shaders and filters must be named, parameterized, documented, and budgeted so visual effects remain portable and debuggable.

## Patterns

- Name shader files with `[type]_[category]_[name].[ext]`.
- Prefer built-in PixiJS filters when they meet the visual requirement.
- Use descriptive uniforms and document non-obvious math.
- Document target platform and complexity budget for every custom shader.
- Minimize fragment texture samples and dynamic branching.
- Provide WebGL2 fallback when using WebGPU-specific features.

## Anti-patterns

- Magic numeric constants with no uniform, name, or comment.
- Texture reads inside loops.
- Unbounded shader variants.
- WebGPU-only shaders with no fallback path.

## References

- `.opencode/rules/shader-code.md`
- `.opencode/agents/technical-artist.md`
