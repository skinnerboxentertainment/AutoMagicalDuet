---
domain: workflow
tags: [design-docs, gdd, specifications]
triggers: [design/gdd/**]
related: [game-design/balancing-methodology, game-design/mda-framework]
---

# Design Doc Standards

Design documents must be implementable, testable, and explicit enough that engineering and QA can work from them without guessing.

## Patterns

- Include Overview, Player Fantasy, Detailed Rules, Formulas, Edge Cases, Dependencies, Tuning Knobs, and Acceptance Criteria.
- Give formulas variable definitions, ranges, output bounds, and worked examples.
- State exact edge-case behavior.
- Document bidirectional dependencies between interacting systems.
- Make acceptance criteria binary enough for QA to pass or fail.
- Create skeletons first and fill sections incrementally with approval.

## Anti-patterns

- "Handle gracefully" without defining behavior.
- Balance values without formula, source, or rationale.
- One system doc naming a dependency that the dependent system doc omits.
- Subjective acceptance criteria without measurable alternatives.

## References

- `.opencode/rules/design-docs.md`
- `.opencode/agents/game-designer.md`
- `.opencode/agents/systems-designer.md`
