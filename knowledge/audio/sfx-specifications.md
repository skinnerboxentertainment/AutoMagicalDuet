---
domain: audio
tags: [sfx, events, variations]
triggers: [design/audio/**, assets/audio/sfx/**, assets/audio/sprites/**]
related: [audio/sonic-identity, pixijs/audio-integration]
---

# SFX Specifications

Sound effects need event-level specifications before production or implementation. Each cue should define trigger, priority, mix behavior, variation, and spatial properties.

## Patterns

- Document description, reference sounds, frequency character, duration, volume range, spatial behavior, and variation count.
- Maintain audio event lists per system with trigger, priority, concurrency limit, and cooldown.
- Use round-robin or pitch randomization for repeated SFX.
- Define ambience as layers: base loop, detail sounds, one-shots, and transitions.
- Assign bus routing and ducking relationships.

## Anti-patterns

- One sound reused for high-frequency actions with no variation.
- SFX trigger definitions embedded only in gameplay code.
- Critical sounds with no concurrency or masking rules.
- Ambience that has no transition policy between areas.

## References

- `.opencode/agents/sound-designer.md`
- `.opencode/skills/automagically-audio/SKILL.md`
