---
domain: qa-testing
tags: [mocks, doubles, deterministic]
triggers: [tests/helpers/**, tests/**]
related: [qa-testing/testing-pyramid, pixijs/audio-integration]
---

# Test Doubles

Tests should replace browser, audio, randomness, and time dependencies with deterministic doubles.

## Patterns

- Use fake clocks for systems that depend on time.
- Use seeded RNG for random gameplay logic.
- Mock audio through `IAudioManager` rather than constructing Howler objects.
- Keep shared helpers in `tests/helpers/` for factories, mocks, assertions, seeded RNG, and fake clock.
- Test state changes directly instead of inferring them through rendered pixels.

## Anti-patterns

- Calling `Date.now()`, `performance.now()`, or `requestAnimationFrame` directly in core game logic.
- Real `Howl` instances in unit tests.
- Random tests without fixed seeds.
- Screenshot tests for state transitions.

## References

- `.opencode/skills/automagically-testing/SKILL.md`
- `.opencode/skills/automagically-audio/SKILL.md`
