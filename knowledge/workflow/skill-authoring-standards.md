---
domain: workflow
tags: [skills, authoring, maintainability]
triggers: [.agents/skills/**, .opencode/skills/**]
related: [workflow/available-skills, workflow/tooling-standards]
---

# Skill Authoring Standards

Skills exist to make agent process predictable. A good skill changes how the agent acts; it does not just restate defaults.

## Patterns

- Choose model-invoked skills only when the agent or another skill must discover them autonomously; otherwise prefer user-invoked skills.
- Front-load the model-facing description with trigger language and the skill's leading words.
- Keep one trigger per branch. Collapse synonyms that point to the same branch.
- Put ordered work in `SKILL.md` as steps with checkable completion criteria.
- Keep definitions, rules, and caveats co-located so a reader gets the whole concept in one place.
- Use progressive disclosure for branch-specific reference material that not every run needs.
- Split skills by invocation when a distinct leading word should trigger independently, or by sequence when later steps cause premature completion.
- Maintain one source of truth for each rule or concept.
- Prune sentence by sentence using the no-op test: if a sentence would not change agent behavior, remove it.
- Use completion criteria that are specific and exhaustive enough to resist premature completion.

## Anti-patterns

- Long descriptions that repeat the body instead of triggering the right situations.
- Duplicating the same instruction in several skills or reference files.
- Letting stale sediment accumulate because adding feels safer than removing.
- Splitting a skill so finely that context load or user memory cost exceeds the value.
- Vague completion criteria such as "be thorough" or "produce a list".

## References

- `.agents/skills/writing-great-skills/SKILL.md`
- `.agents/skills/writing-great-skills/GLOSSARY.md`
