# PixiJS — Version Reference

| Field | Value |
|-------|-------|
| **Engine** | PixiJS v8 |
| **Language** | TypeScript (strict) |
| **Project Pinned** | 2026-06-25 |
| **LLM Knowledge Cutoff** | May 2025 |
| **Risk Level** | MEDIUM — v8 APIs may differ from training data |

## Key v8 Changes

- `Loader` removed → use `Assets` class
- `Application` options changed — see PixiJS v8 migration guide
- `Filter` constructor changed → use `Filter.from()` for inline filters
- `Ticker` is now a standalone class
