---
domain: game-design
tags: [flow, onboarding, feedback]
triggers: [design/gdd/**, src/gameplay/**, src/ui/**]
related: [game-design/core-loops, game-design/mda-framework]
---

# Flow Design

Keep players in the flow channel by matching challenge to skill, teaching through play, and making consequences readable quickly.

## Patterns

- Introduce each new mechanic in isolation before combining it with other mechanics.
- Shape difficulty as a sawtooth: build tension, release at a milestone, then resume from a slightly higher baseline.
- Provide micro-feedback within roughly half a second of player action.
- Make success and failure causality visible so competence can develop.
- Scale failure cost to failure frequency; common failures need quick recovery.

## Anti-patterns

- Front-loading tutorial text before the player can act.
- Vertical difficulty spikes with no preparation.
- Failure states where the player cannot identify what caused the loss.
- Long recovery loops for frequent mistakes.

## References

- `.opencode/agents/game-designer.md`
- `.opencode/agents/ux-designer.md`
