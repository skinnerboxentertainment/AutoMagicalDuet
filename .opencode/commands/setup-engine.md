---
description: Configure the PixiJS v8 + TypeScript web project. Sets up Vite, TypeScript config, installs PixiJS, and populates technical-preferences.md.
agent: build
---

When this skill is invoked:

## 1. Parse Arguments

No arguments needed — PixiJS v8 + TypeScript is the only stack:

- `/setup-engine` — full setup with user confirmation steps
- `/setup-engine refresh` — re-verify PixiJS version and update reference docs

---

## 2. Check Project State

1. Check if `package.json` exists in the project root. If so, check if `pixi.js` is already installed.
2. Read `.opencode/docs/technical-preferences.md` to see if already configured.
3. Read `.opencode/docs/pixijs-reference/VERSION.md` to check version state.

Report current state to the user:
- "PixiJS v8 project — [already configured / needs setup]"
- "PixiJS package: [installed / not installed]"

---

## 3. PixiJS Version Check

Use WebSearch to find the latest stable PixiJS v8.x release:
- Search: `"pixi.js latest stable version 2026"`
- Confirm with the user: "The latest stable PixiJS is [version]. Use this?"

If refreshing, check for newer versions since last pin.

---

## 4. Initialize npm Project (if needed)

If no `package.json` exists:

```bash
npm init -y
npm install pixi.js@^8
npm install -D typescript vite vitest @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint prettier
```

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

Create `vite.config.ts`:
```typescript
import { defineConfig } from "vite"

export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    target: "es2022"
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
})
```

Create a basic `src/main.ts` entry point:
```typescript
import { Application } from "pixi.js"

const app = new Application()
await app.init({ resizeTo: window })
document.body.appendChild(app.canvas)

// Game will be built here
```

Create `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Game</title>
  <style>body { margin: 0; overflow: hidden; }</style>
</head>
<body>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

Add scripts to `package.json`:
```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

---

## 5. Update Technical Preferences

Read `.opencode/docs/technical-preferences.md` and fill in any remaining `[TO BE CONFIGURED]` values using defaults from the PixiJS stack. Ask the user before overwriting existing values.

---

## 6. Update VERSION.md

Update `.opencode/docs/pixijs-reference/VERSION.md` with the confirmed version and today's date.

---

## 7. Update package.json Scripts (if needed)

If package.json exists but is missing dev/build/test scripts, suggest adding them.

---

## 8. Output Summary

```
PixiJS Setup Complete
=====================
Renderer:       PixiJS v8 [version]
Language:       TypeScript (strict)
Build:          Vite + tsc
Testing:        Vitest
Tech Prefs:     [created/updated]
VERSION.md:     [created/updated]

Next Steps:
1. Run `/start` or `/brainstorm` to define your game concept
2. Run `/map-systems` to decompose your concept into systems
3. Run `/design-system` to author per-system GDDs
4. Create your first milestone: `/sprint-plan new`
```

---

Verdict: **COMPLETE** — PixiJS web project configured and ready.
