---
domain: game-design
tags: [economy, rewards, progression]
triggers: [design/gdd/**, assets/data/**]
related: [game-design/balancing-methodology, qa-testing/analytics-metrics]
---

# Economy Design

Virtual economies require explicit resource flow models. Every currency, item, unlock, and reward source needs a matching understanding of where resources leave or lose value.

## Patterns

- Map every faucet that creates resources and every sink that removes or consumes them.
- Model expected resource gain over the target session length.
- Define acquisition timelines for each reward tier.
- Use pity timers or bad luck protection when probabilistic rewards can create unacceptable streaks.
- Track health metrics such as average currency per hour, item acquisition rate, and stockpile distribution.
- Register cross-system items, currencies, and loot facts in the shared entity registry when they appear in multiple designs.

## Anti-patterns

- Loot tables with vague rarity words but no rates or weights.
- Infinite accumulation with no meaningful sink.
- Costs tuned independently from expected earning rate.
- Pay-to-win advantages in competitive contexts or hidden odds in chance-based rewards.

## References

- `.opencode/agents/economy-designer.md`
- `.opencode/agents/game-designer.md`
