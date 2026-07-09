---
domain: architecture
tags: [engine, hot-paths, api]
triggers: [src/core/**]
related: [architecture/layer-isolation, architecture/resource-cleanup]
---

# Engine Code Standards

Engine code forms the foundation other systems depend on. It must be stable, allocation-conscious, documented, and isolated from gameplay.

## Patterns

- Pre-allocate, pool, or reuse objects in update, rendering, physics, and query hot paths.
- Document whether engine APIs are thread-safe or single-thread-only.
- Profile before and after optimizations.
- Provide usage examples in public API doc comments.
- Use deterministic cleanup for resources.
- Add deprecation and migration guidance for public interface changes.
- Support graceful degradation when renderer, assets, or platform features are unavailable.

## Anti-patterns

- Engine imports from gameplay, UI, AI, or scene-specific modules.
- Array filters, spreads, or temporary collections inside hot loops.
- Public API changes with no migration path.
- Engine APIs that assume a specific game mode or design.

## References

- `.opencode/rules/engine-code.md`
- `.opencode/agents/engine-programmer.md`
