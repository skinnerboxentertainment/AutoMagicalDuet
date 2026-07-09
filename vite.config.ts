import { defineConfig } from "vite"
import type { UserConfig } from "vite"
import { cpSync, createReadStream, existsSync, mkdirSync, statSync } from "node:fs"
import { join } from "node:path"

const assetContentTypes: Record<string, string> = {
  ".json": "application/json",
  ".png": "image/png",
}

export default defineConfig({
  root: ".",
  publicDir: "public",
  plugins: [
    {
      name: "serve-root-assets",
      configureServer(server) {
        server.middlewares.use("/assets", (request, response, next) => {
          const url = request.url?.split("?")[0] ?? ""
          const filePath = join(process.cwd(), "assets", url)
          if (!existsSync(filePath) || !statSync(filePath).isFile()) {
            next()
            return
          }

          const extension = filePath.slice(filePath.lastIndexOf("."))
          response.setHeader("Content-Type", assetContentTypes[extension] ?? "application/octet-stream")
          response.setHeader("Cache-Control", "no-cache")
          createReadStream(filePath).pipe(response)
        })
      },
      closeBundle() {
        const source = join(process.cwd(), "assets")
        const target = join(process.cwd(), "dist", "assets")
        if (!existsSync(source)) {
          return
        }

        mkdirSync(target, { recursive: true })
        cpSync(source, target, { recursive: true })
      },
    },
  ],
  build: {
    outDir: "dist",
    target: "es2022",
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
} as UserConfig)
