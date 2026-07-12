import { bootAspect, destroyAspect } from "./aspect/main-aspect"

let started = false

export function launchAspectFromUI(): void {
  const container = document.getElementById("game-container")
  const target = document.getElementById("game-canvas-target")
  const encyclopedia = document.getElementById("encyclopedia")

  if (!container || !target) return

  container.classList.remove("hidden")
  if (encyclopedia) encyclopedia.classList.add("hidden")

  if (!started) {
    started = true
    bootAspect(target).catch((error: unknown) => {
      console.error("ASPECT boot failed", error)
    })
  }

  const closeBtn = container.querySelector("button")
  if (closeBtn) {
    closeBtn.onclick = () => {
      container.classList.add("hidden")
      if (encyclopedia) encyclopedia.classList.remove("hidden")
    }
  }
}

declare global {
  interface Window {
    launchGame: () => void
    closeGame: () => void
  }
}

window.launchGame = launchAspectFromUI
window.closeGame = () => {
  const container = document.getElementById("game-container")
  const encyclopedia = document.getElementById("encyclopedia")
  if (container) container.classList.add("hidden")
  if (encyclopedia) encyclopedia.classList.remove("hidden")
}
