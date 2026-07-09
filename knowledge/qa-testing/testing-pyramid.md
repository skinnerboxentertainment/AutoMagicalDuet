---
domain: qa-testing
tags: [testing, vitest, playwright]
triggers: [tests/**, src/**]
related: [qa-testing/test-standards, qa-testing/browser-smoke-tests]
---

# Testing Pyramid

Most coverage should test deterministic logic without a browser or renderer. Browser and visual tests are valuable but intentionally sparse.

## Patterns

- Mirror `src/` under `tests/` with `unit/`, `integration/`, `browser/`, `visual/`, and `helpers/` directories.
- Use unit tests for roughly 80% of coverage: state transitions, formulas, collision decisions, spawn logic, save/load, and seeded RNG.
- Use integration tests for roughly 15% of coverage: scene lifecycle, input capture, audio routing, resize behavior, and asset failure handling.
- Use browser tests for roughly 4% of coverage: startup, canvas rendering, input paths, pause/resume, fullscreen, and focus-loss behavior.
- Use visual tests for roughly 1% of coverage, limited to stable contracts such as main menu, representative gameplay, HUD, and game-over state.
- Keep shared factories, mocks, assertions, fake clocks, and seeded RNG helpers in `tests/helpers/`.

## Anti-patterns

- Testing gameplay logic through screenshots.
- Visual regression tests for animations, particles, or nondeterministic content.
- Unit tests that require PixiJS, a browser, network, or filesystem state.
- Integration tests that leave listeners, timers, or scene objects alive.

## References

- `.opencode/skills/automagically-testing/SKILL.md`
- `.opencode/agents/qa-lead.md`
