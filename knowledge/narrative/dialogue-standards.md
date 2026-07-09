---
domain: narrative
tags: [dialogue, localization, writing]
triggers: [design/narrative/**, locales/**]
related: [workflow/localization, narrative/worldbuilding-consistency]
---

# Dialogue Standards

Dialogue must serve character, context, and gameplay clarity while staying localization-ready.

## Patterns

- Give every line a speaker tag and context note.
- Match the voice profile defined for the character.
- Use condition and state annotations for branching dialogue.
- Use named placeholders such as `{player_name}` and `{item_count}`.
- Keep dialogue lines within 120 characters for dialogue box constraints.
- Avoid idioms that do not translate cleanly.
- Make mechanical information in item and ability text unambiguous.

## Anti-patterns

- Lines that contradict character voice profiles.
- Variable insertion by string concatenation.
- Unannotated dialogue that lacks trigger or state context.
- Flavor text that obscures essential mechanics.

## References

- `.opencode/agents/writer.md`
- `.opencode/rules/narrative.md`
