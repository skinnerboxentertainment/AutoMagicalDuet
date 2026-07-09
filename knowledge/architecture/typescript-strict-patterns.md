---
domain: architecture
tags: [typescript, strict, types]
triggers: [src/**/*.ts, tests/**/*.ts]
related: [architecture/layer-isolation, qa-testing/test-standards]
---

# TypeScript Strict Patterns

Strict TypeScript is a design constraint. Public APIs, state machines, and IDs should be typed so illegal states are hard to express.

## Patterns

- Use `unknown` plus type guards instead of `any`.
- Use discriminated unions for state machines.
- Use branded types for entity and identifier values.
- Add explicit return types to public functions.
- Prefer `Readonly` for immutable state.
- Add error boundaries to async operations.
- Use `AbortController` for cancellable async work.
- Use compiler-backed analysis for symbol lookup, references, import traces, and boundary violations when available.

## Anti-patterns

- `any` outside narrow type guard boundaries.
- Undocumented `as` assertions.
- Non-null assertions instead of narrowing.
- `// @ts-ignore` or `// @ts-expect-error`.
- Runtime enums where `as const` objects or literal unions are sufficient.
- Circular module imports.

## References

- `.opencode/skills/typescript-patterns/SKILL.md`
- `.opencode/agents/lead-programmer.md`
