---
paths:
  - src/core/**
---

# Engine Code Rules

- ZERO allocations in hot paths (update loops, rendering, physics) — pre-allocate, pool, reuse
- All engine APIs must be thread-safe OR explicitly documented as single-thread-only
- Profile before AND after every optimization — document the measured numbers
- Engine code must NEVER depend on gameplay code (strict dependency direction: engine <- gameplay)
- Every public API must have usage examples in its doc comment
- Changes to public interfaces require a deprecation period and migration guide
- Use RAII / deterministic cleanup for all resources
- All engine systems must support graceful degradation
- Before writing engine API code, consult `.opencode/docs/pixijs-reference/VERSION.md` for the PixiJS version and verify APIs against the reference docs

## Examples

**Correct** (zero-alloc hot path):

```typescript
// Pre-allocated array reused each frame
const nearbyCache: Container[] = []

function update(_delta: number): void {
  nearbyCache.length = 0 // Reuse, don't reallocate
  spatialGrid.query(position, radius, nearbyCache)
}
```

**Incorrect** (allocating in hot path):

```typescript
function update(_delta: number): void {
  const nearby: Container[] = [] // VIOLATION: allocates every frame
  nearby.push(...app.stage.children.filter(c => c.hitArea !== undefined)) // VIOLATION: filter allocates
}
```
