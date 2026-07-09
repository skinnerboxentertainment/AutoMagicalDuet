---
domain: architecture
tags: [modules, review, seams]
triggers: [src/**, docs/architecture/adr/**]
related: [architecture/layer-isolation, workflow/decision-records, qa-testing/tdd-tracer-bullets]
---

# Deep Module Review

Architecture review should look for deepening opportunities: refactors that put real complexity behind small, stable interfaces and improve locality, leverage, and testability.

## Patterns

- Use consistent vocabulary: module, interface, depth, seam, adapter, leverage, and locality.
- Look for concepts that require bouncing across many small modules to understand.
- Flag shallow modules whose interface is nearly as complex as their implementation.
- Treat the interface as the test surface; deep modules should let tests verify meaningful behavior without knowing internals.
- Apply the deletion test to suspected shallow modules: deleting one should concentrate complexity behind a better shape, not merely move code elsewhere.
- Prefer seams named in the domain language from `CONTEXT.md` or current design docs.
- Treat one adapter as a hypothetical seam and two adapters as stronger evidence that the seam is real.
- Surface ADR conflicts only when the current friction is strong enough to justify reopening the decision.
- When presenting candidates, include files, problem, solution, benefits, before/after shape, and recommendation strength.

## Anti-patterns

- Calling every extraction a module improvement when it only creates more hopping.
- Extracting pure functions solely for testability while the real bugs live in caller coordination.
- Proposing interfaces before understanding the domain concept and test surface.
- Re-litigating ADRs without concrete friction.
- Using vague architecture labels such as component, service, or API when the review needs module and interface precision.

## References

- `.agents/skills/improve-codebase-architecture/SKILL.md`
- `knowledge/architecture/layer-isolation.md`
