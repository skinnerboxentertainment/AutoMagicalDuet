import { defineConfig } from "vite"
import type { UserConfig } from "vite"

export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    target: "es2022",
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
} as UserConfig)
