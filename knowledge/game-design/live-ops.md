---
domain: game-design
tags: [live-ops, events, retention]
triggers: [design/live-ops/**, assets/data/**]
related: [game-design/economy-design, qa-testing/analytics-metrics]
---

# Live Ops

Live operations should use scheduled, data-driven events with clear goals, measurable outcomes, and economy-safe rewards.

## Patterns

- Define event goals before reward tables or content cadence.
- Connect live events to retention, reactivation, economy health, or community goals.
- Use data files for event schedules, reward pools, modifiers, and availability windows.
- Protect the base economy from event reward inflation.
- Measure participation, completion, spend or resource movement, and return rate.

## Anti-patterns

- Events that add rewards without sinks or pacing controls.
- Manual code deploys for routine schedule changes.
- Retention mechanics that rely on opaque pressure or exploitative patterns.
- Live changes without rollback or expiry.

## References

- `.opencode/agents/live-ops-designer.md`
- `.opencode/agents/analytics-engineer.md`
