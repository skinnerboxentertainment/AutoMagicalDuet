---
domain: game-design
tags: [balance, formulas, tuning]
triggers: [design/gdd/**, assets/data/**, src/gameplay/**]
related: [game-design/economy-design, workflow/design-doc-standards]
---

# Balancing Methodology

Balance work must separate target experience, mathematical model, and tuning knobs. Numeric systems need formulas, ranges, worked examples, and data-driven values.

## Patterns

- Anchor combat or challenge tuning to measurable targets such as time-to-kill, time-to-complete, resource gain rate, or failure recovery time.
- Use appropriate balance structures: transitive, intransitive, frustra, or asymmetric.
- Group knobs into feel knobs, curve knobs, and gate knobs.
- Put gameplay values in external data files with safe ranges and rationale.
- Include edge cases for minimums, maximums, clamping, zero divisions, overflow, and degenerate strategies.

## Anti-patterns

- Hardcoded balance values in gameplay code.
- Formulas without variable tables, ranges, or examples.
- Numeric changes with no rationale or test expectation.
- Balancing only around average cases while ignoring extremes and exploits.

## References

- `.opencode/agents/game-designer.md`
- `.opencode/agents/systems-designer.md`
- `.opencode/rules/gameplay-code.md`
