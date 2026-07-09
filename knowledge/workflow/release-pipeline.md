---
domain: workflow
tags: [release, versioning, hotfix]
triggers: [production/release/**, package.json, vite.config.ts]
related: [workflow/verification-gate, workflow/scope-management]
---

# Release Pipeline

Releases proceed through build, test, certification or platform checks, submission, verification, launch, and post-release monitoring. Failed steps halt the pipeline.

## Patterns

- Use semantic versioning for player-facing releases.
- Use internal build numbers in `MAJOR.MINOR.PATCH.BUILD` form.
- Tag releases in git.
- For hotfixes, branch from the release tag, apply the minimal fix, QA verify, deploy, then merge back.
- Monitor crash rate, retention, store reviews, community channels, and server health during the first 72 hours.

## Anti-patterns

- Skipping QA sign-off because the build is late.
- Mixing feature work into hotfix branches.
- Launching without store-build verification on target hardware or browser targets.
- Shipping without known issue and support-channel coordination.

## References

- `.opencode/agents/release-manager.md`
- `.opencode/agents/devops-engineer.md`
