# Verification Gate

Before marking any task as complete, the agent must run verification checks
appropriate to what was changed.

## Required checks

1. **TypeScript** — Run `npx tsc --noEmit`. Zero errors required.
2. **Tests** — Run `npx vitest run`. All tests must pass.
3. **No regressions** — If tests existed before the change, all pre-existing
   tests must still pass. Adding new passing tests is fine; breaking existing
   tests is not.

## Scope-specific checks

| Change type | Additional check |
|-------------|------------------|
| Gameplay code | State is on plain classes, not display objects |
| Audio code | `IAudioManager` interface is respected |
| Architecture code | Scene lifecycle contract is followed |
| Asset loading | PixiJS v8 `Assets` class used, not v7 `Loader` |

## Failure handling

If verification fails:

1. Read the error output
2. Fix the underlying issue
3. Re-run verification
4. Repeat up to 3 attempts

If still failing after 3 attempts: report `PASS WITH NOTES` — list the failure
and whether it's a blocker or a warning. Do not silently proceed past failures.

## Verdict

- **PASS** — all checks pass
- **PASS WITH NOTES** — pass with warnings documented
- **FAIL** — unresolved blocker; do not mark task complete
