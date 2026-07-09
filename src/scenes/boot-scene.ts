import { Assets } from "pixi.js"
import type { Scene } from "../core/types"

export class BootScene implements Scene {
  private loaded = false
  private error: string | null = null
  private ready = false

  constructor(private readonly onLoaded: () => void) {}

  enter(): void {
    if (this.ready) return
    this.ready = true
    this.loadGameplayAssets()
  }

  update(_dt: number): void {}

  exit(): void {}

  private async loadGameplayAssets(): Promise<void> {
    try {
      await Assets.init({ manifest: "assets/manifest.json" })
      await Assets.loadBundle("gameplay")
      this.loaded = true
      this.onLoaded()
    } catch (err) {
      this.error = String(err)
      console.error("BootScene asset loading failed:", err)
    }
  }
}
