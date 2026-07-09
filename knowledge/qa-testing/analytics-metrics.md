---
domain: qa-testing
tags: [analytics, telemetry, metrics]
triggers: [src/analytics/**, design/analytics/**]
related: [game-design/economy-design, workflow/release-pipeline]
---

# Analytics Metrics

Telemetry should answer specific design and quality questions. Each event needs a documented purpose, naming convention, and privacy review.

## Patterns

- Name events as `[category].[action].[detail]`, such as `game.level.started` or `economy.currency.spent`.
- Define funnel steps for onboarding, progression, monetization, retention, or feature use.
- Specify dashboards by chart, data source, and actionable insight.
- Define A/B test segmentation, assignment, success metrics, and minimum sample sizes before running.
- Anonymize or pseudonymize analytics data and provide opt-out where required.

## Anti-patterns

- Collecting data with no intended decision.
- Making design decisions from data alone without design interpretation.
- Personally identifiable telemetry without explicit requirements.
- Events whose names encode inconsistent categories or actions.

## References

- `.opencode/agents/analytics-engineer.md`
- `.opencode/agents/economy-designer.md`
