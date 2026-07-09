---
domain: game-design
tags: [cadence, seasons, retention]
triggers: [design/live-ops/**]
related: [game-design/live-ops, workflow/community-communication]
---

# Live Ops Cadence

Live content needs cadence tiers, production buffer, event fallback plans, and retention metrics.

## Patterns

- Define daily, weekly, monthly, seasonal, and annual cadence tiers with scope and frequency.
- Maintain at least two weeks of content buffer ahead of schedule.
- Give each season a theme, duration, content list, reward track, economy changes, and success metrics.
- Design events with start/end dates, mechanics, rewards, success criteria, and fallback plan.
- Track D1, D7, D14, D30, D60, and D90 retention.
- Avoid permanent economy changes without economy review.

## Anti-patterns

- Seasonal schedules that conflict with core progression or story beats.
- Event launches that cannot be disabled, extended, or compensated if broken.
- Premium tracks with exclusive gameplay power.
- Obfuscated currency conversion or artificial spending pressure.

## References

- `.opencode/agents/live-ops-designer.md`
- `.opencode/agents/economy-designer.md`
