---
domain: workflow
tags: [community, patch-notes, feedback]
triggers: [production/community/**, production/releases/**]
related: [workflow/release-pipeline, game-design/live-ops]
---

# Community Communication

Player-facing communication should be clear, transparent, coordinated with release timing, and written for players rather than developers.

## Patterns

- Structure patch notes around headline, new content, gameplay changes, bug fixes, known issues, and optional developer commentary.
- Include before/after values for balance changes.
- Publish feedback digests with top requested features, top reported bugs, sentiment trend, and noteworthy suggestions.
- Acknowledge incidents quickly, update regularly during active issues, and write post-mortems after resolution.
- Never promise features or dates without production approval.

## Anti-patterns

- Developer jargon in player-facing patch notes.
- Hiding known issues that materially affect players.
- Speculating about future plans in public.
- Combative responses to criticism.

## References

- `.opencode/agents/community-manager.md`
- `.opencode/agents/release-manager.md`
