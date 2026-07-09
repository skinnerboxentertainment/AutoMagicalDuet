---
domain: pixijs
tags: [audio, howler, scenes]
triggers: [src/audio/**, src/scenes/**, assets/audio/**]
related: [architecture/scene-lifecycle, qa-testing/test-doubles]
---

# Audio Integration

Scenes call an audio manager for music and sound effects. Howler owns runtime playback; scene lifecycle owns when audio starts and stops.

## Patterns

- Initialize audio only after a user gesture.
- Use separate music and SFX volume controls, persisted to local storage.
- Provide WebM/Opus primary audio and MP3 fallback.
- Start scene music in `enter()` and stop/unload scene-owned audio in `exit()`.
- Use Howler audio sprites for frequently played short SFX.
- Expose an `IAudioManager` interface and use test doubles in automated tests.

## Anti-patterns

- Creating `Howl` instances at module scope.
- Creating `AudioContext` before user interaction.
- MP3-only runtime sources.
- Uncaught `onloaderror` or `onplayerror` failures blocking gameplay.
- Real Howler instances in unit tests.

## References

- `.opencode/skills/automagically-audio/SKILL.md`
- `.opencode/agents/audio-specialist.md`
