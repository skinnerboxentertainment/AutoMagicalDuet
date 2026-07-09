---
domain: audio
tags: [audio, direction, mix]
triggers: [design/audio/**, assets/audio/**, src/audio/**]
related: [pixijs/audio-integration, qa-testing/accessibility]
---

# Sonic Identity

Audio direction defines the sound palette, music behavior, event architecture, mix hierarchy, and asset specifications so audio supports both emotion and gameplay clarity.

## Patterns

- Define the palette: acoustic or synthetic, clean or distorted, sparse or dense.
- Map music and ambience to game states, locations, intensity, and emotional arc.
- Define audio event triggers, priorities, layering, ducking, and concurrency.
- Ensure gameplay-critical audio remains audible in the mix.
- Use category naming such as `[category]_[context]_[name]_[variant].[ext]`.
- Document sample rate, format, loudness, and file-size budgets per category.

## Anti-patterns

- Music or SFX choices that obscure gameplay-critical cues.
- Audio events with no priority or overlap policy.
- Unnamed one-off files that bypass asset conventions.
- Sonic direction changing middleware or code architecture without technical approval.

## References

- `.opencode/agents/audio-director.md`
- `.opencode/agents/sound-designer.md`
