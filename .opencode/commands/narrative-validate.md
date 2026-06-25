---
description: Validate a NarrativeDocumentV2 JSON file against the schema and run graph analysis. Optionally generate a game graph from GDD markdown files.
agent: build
---

When this skill is invoked:

## 1. Parse Arguments

Two modes:

- **Validate a file**: `/narrative-validate design/game-graph.json`
- **Generate from GDDs**: `/narrative-validate generate` — scans `design/gdd/` for markdown files and produces a game-graph.json

## 2. Validate Mode

Read the specified JSON file and validate it against the `NarrativeDocumentV2` schema from `@automagically/narrative-core`.

Steps:
1. Read the JSON file at the given path
2. Import `NarrativeDocumentV2Schema` from `@automagically/narrative-core`
3. Parse the JSON through the schema
4. Run `analyzeDocument()` from the same package
5. Report results

Output format:
```
VALIDATION: design/game-graph.json
───────────────────────────────────
Schema:    ✅ PASS (NarrativeDocumentV2 v2.0.0)
Nodes:     12
Edges:     18
Variables:  4
Events:     2

ANALYSIS RESULTS
───────────────────────────────────
Unreachable nodes:  1  (node_sys_003)
Orphan nodes:       0
Dead ends:          2  (node_sys_007, node_sys_011)
Broken scene refs:  0
Broken edge refs:   0

RECOMMENDATIONS
───────────────────────────────────
- node_sys_003 has no path from start → verify it's reachable
- node_sys_007, node_sys_011 are dead ends — add transitions or mark as ending
```

## 3. Generate Mode

Scan `design/gdd/*.md` for GDD documents and generate a `NarrativeDocumentV2` graph:

1. Read each markdown file in `design/gdd/`
2. Extract system names, dependency references, and cross-links from headings and links
3. Build a topology layer where:
   - Each GDD = one node
   - Each cross-reference or dependency mention = one transition edge
   - Document metadata (title, description, tags) = metadata layer
4. Write the result to `design/game-graph.json`

This produces a machine-readable dependency graph that mirrors the GDDs.
Run `/narrative-validate design/game-graph.json` after generation to verify.

## 4. Guardrails

- Never modify the input JSON — validation is read-only
- If the schema parse fails, show the Zod error details
- If no GDDs are found in generate mode, report: "No GDDs found in design/gdd/"
