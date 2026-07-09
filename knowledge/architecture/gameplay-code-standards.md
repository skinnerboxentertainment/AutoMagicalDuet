---
domain: architecture
tags: [gameplay, data-driven, state-machines]
triggers: [src/gameplay/**]
related: [architecture/state-ownership, game-design/balancing-methodology]
---

# Gameplay Code Standards

Gameplay code must faithfully implement design documents with data-driven values, explicit state, and frame-rate independent behavior.

## Patterns

- Load numeric gameplay values from config/data files with sensible defaults.
- Use delta time for all movement, cooldowns, timers, and time-dependent formulas.
- Implement clear interfaces for each gameplay system.
- Represent state machines with documented states and explicit transition tables.
- Use events, commands, or signals for gameplay-to-UI communication.
- Add unit tests for gameplay logic separate from rendering.
- Document which design doc a feature implements.

## Anti-patterns

- Hardcoded damage, speed, health, spawn rate, or economy values.
- Direct imports from gameplay into UI or UI into gameplay.
- Static singletons for mutable game state.
- Implicit state transitions hidden in nested conditionals.

## References

- `.opencode/rules/gameplay-code.md`
- `.opencode/agents/gameplay-programmer.md`
