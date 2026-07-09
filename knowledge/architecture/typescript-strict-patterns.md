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
- Review each file for `any`, undocumented `as`, non-null `!`, `@ts-ignore`, `@ts-expect-error`, missing public return types, implicit parameter `any`, runtime enums, wrong-layer imports, and `Function` or `object` types.
- Report TypeScript reviews with passing checks, warnings, and blocking failures.
- Use compiler-backed analysis for symbol lookup, references, import traces, and boundary violations when available.

## Anti-patterns

- `any` outside narrow type guard boundaries.
- Undocumented `as` assertions.
- Non-null assertions instead of narrowing.
- `// @ts-ignore` or `// @ts-expect-error`.
- Runtime enums where `as const` objects or literal unions are sufficient.
- `Function` or `object` as broad escape-hatch types.
- Circular module imports.
- Direct gameplay-to-UI imports or core imports from gameplay, AI, UI, or rendering layers.

## References

- `.opencode/skills/typescript-patterns/SKILL.md`
- `.opencode/agents/lead-programmer.md`
