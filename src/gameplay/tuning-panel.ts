import { MovementConfig } from "./physics/types"
import { PRESETS } from "./presets"

interface ParamDef {
  key: keyof MovementConfig
  label: string
  min: number
  max: number
  step: number
}

const CANCEL_MODES = ["none", "partial", "full"] as const

const SLIDER_PARAMS: ParamDef[] = [
  { key: "maxSpeed", label: "Max Speed", min: 100, max: 1000, step: 10 },
  { key: "acceleration", label: "Acceleration", min: 500, max: 6000, step: 100 },
  { key: "deceleration", label: "Deceleration", min: 500, max: 6000, step: 100 },
  { key: "turnMultiplier", label: "Turn Multiplier", min: 0.5, max: 5, step: 0.1 },
  { key: "jumpForce", label: "Jump Force", min: 300, max: 1500, step: 10 },
  { key: "gravity", label: "Gravity", min: 500, max: 4000, step: 50 },
  { key: "fallGravityMultiplier", label: "Fall Grav Mult", min: 1, max: 4, step: 0.1 },
  { key: "terminalVelocity", label: "Terminal Vel", min: 500, max: 3000, step: 50 },
  { key: "airControl", label: "Air Control", min: 0, max: 1, step: 0.05 },
  { key: "airFriction", label: "Air Friction", min: 0, max: 1500, step: 50 },
  { key: "jumpCancelMode", label: "Cancel Mode", min: 0, max: 2, step: 1 },
  { key: "minJumpHold", label: "Min Hold (s)", min: 0, max: 0.2, step: 0.005 },
  { key: "maxJumpHold", label: "Max Hold (s)", min: 0, max: 0.6, step: 0.01 },
  { key: "earlyReleaseGravityMultiplier", label: "Early Release Grav", min: 1, max: 6, step: 0.1 },
  { key: "elasticity", label: "Elasticity", min: 0, max: 2.5, step: 0.1 },
  { key: "squashRecoveryRate", label: "Squash Recovery", min: 1, max: 40, step: 1 },
  { key: "maxAirJumps", label: "Max Air Jumps", min: 0, max: 10, step: 1 },
  { key: "coyoteTime", label: "Coyote Time (s)", min: 0, max: 0.3, step: 0.005 },
  { key: "jumpBuffer", label: "Jump Buffer (s)", min: 0, max: 0.3, step: 0.005 },
]

export function detectPreset(config: MovementConfig): string {
  for (const [name, p] of Object.entries(PRESETS)) {
    if (deepEqual(config, p)) return name
  }
  return "Custom"
}

function deepEqual(a: MovementConfig, b: MovementConfig): boolean {
  for (const k of Object.keys(a) as (keyof MovementConfig)[]) {
    if (a[k] !== b[k]) return false
  }
  return true
}

export function createTuningPanel(
  container: HTMLElement,
  getConfig: () => MovementConfig,
  setConfig: (c: MovementConfig) => void,
): { elem: HTMLDivElement; destroy: () => void; updateLabel: () => void } {
  const overlay = document.createElement("div")
  overlay.id = "tuning-panel"
  Object.assign(overlay.style, {
    position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
    background: "rgba(0,0,0,0.8)", zIndex: "300", display: "none",
    fontFamily: "monospace", fontSize: "13px", color: "#ccc",
    overflow: "auto", padding: "20px", boxSizing: "border-box",
  })

  const header = document.createElement("div")
  header.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;"

  const title = document.createElement("h2")
  title.textContent = "Tuning Panel"
  title.style.cssText = "color:#6a5acd;margin:0;font-size:18px;"

  const presetLabel = document.createElement("span")
  presetLabel.id = "tuning-preset-label"
  presetLabel.style.cssText = "color:#4ade80;font-weight:bold;font-size:14px;"

  const closeBtn = document.createElement("button")
  closeBtn.textContent = "✕ Close (Tab)"
  Object.assign(closeBtn.style, {
    background: "#2a2a3e", color: "#e0e0e0", border: "none",
    padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "13px",
  })
  closeBtn.onclick = () => { overlay.style.display = "none" }

  header.appendChild(title)
  header.appendChild(presetLabel)
  header.appendChild(closeBtn)
  overlay.appendChild(header)

  const grid = document.createElement("div")
  grid.style.cssText = "display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px;"

  const catMap: { name: string; keys: string[] }[] = [
    { name: "Ground Movement", keys: ["maxSpeed", "acceleration", "deceleration", "turnMultiplier"] },
    { name: "Jump Core", keys: ["jumpForce", "gravity", "fallGravityMultiplier", "terminalVelocity"] },
    { name: "Air Movement", keys: ["airControl", "airFriction"] },
    { name: "Variable Height", keys: ["jumpCancelMode", "minJumpHold", "maxJumpHold", "earlyReleaseGravityMultiplier"] },
    { name: "Feel & Assists", keys: ["elasticity", "squashRecoveryRate", "maxAirJumps", "coyoteTime", "jumpBuffer"] },
  ]

  const sliders: { key: string; val: HTMLSpanElement; slider: HTMLInputElement; select?: HTMLSelectElement }[] = []

  for (const cat of catMap) {
    const section = document.createElement("div")
    section.style.cssText = "background:#1a1a2e;border:1px solid #2a2a3e;border-radius:8px;padding:12px;"

    const catTitle = document.createElement("div")
    catTitle.textContent = cat.name
    catTitle.style.cssText = "color:#6a5acd;font-weight:bold;margin-bottom:8px;font-size:14px;"
    section.appendChild(catTitle)

    for (const key of cat.keys) {
      const def = SLIDER_PARAMS.find(p => p.key === key)
      if (!def) continue
      const row = document.createElement("div")
      row.style.cssText = "margin-bottom:8px;"

      if (key === "jumpCancelMode") {
        const label = document.createElement("div")
        label.style.cssText = "color:#888;font-size:12px;margin-bottom:2px;"
        label.textContent = def.label
        const select = document.createElement("select")
        Object.assign(select.style, {
          width: "100%", background: "#0d0d1a", color: "#e0e0e0",
          border: "1px solid #2a2a3e", borderRadius: "4px", padding: "4px 8px",
        })
        CANCEL_MODES.forEach(m => {
          const opt = document.createElement("option")
          opt.value = m
          opt.textContent = m
          select.appendChild(opt)
        })
        select.value = getConfig().jumpCancelMode
        select.onchange = () => {
          const c = { ...getConfig(), jumpCancelMode: select.value as "none" | "partial" | "full" }
          setConfig(c)
          updateLabel()
        }
        row.appendChild(label)
        row.appendChild(select)
        sliders.push({ key, val: null!, slider: null!, select })
      } else {
        const labelRow = document.createElement("div")
        labelRow.style.cssText = "display:flex;justify-content:space-between;color:#888;font-size:12px;"
        const label = document.createElement("span")
        label.textContent = def.label
        const val = document.createElement("span")
        val.textContent = String(getConfig()[key as keyof MovementConfig] ?? 0)
        labelRow.appendChild(label)
        labelRow.appendChild(val)

        const slider = document.createElement("input")
        slider.type = "range"
        Object.assign(slider, {
          min: String(def.min), max: String(def.max), step: String(def.step),
          value: String(getConfig()[key as keyof MovementConfig] ?? def.min),
        })
        slider.style.cssText = "width:100%;accent-color:#6a5acd;height:4px;"

        slider.oninput = () => {
          const v = parseFloat(slider.value)
          const c = { ...getConfig(), [key]: v } as MovementConfig
          setConfig(c)
          val.textContent = v.toFixed(def.step < 1 ? 3 : 0)
          updateLabel()
        }
        row.appendChild(labelRow)
        row.appendChild(slider)
        sliders.push({ key, val, slider })
      }
      section.appendChild(row)
    }
    grid.appendChild(section)
  }

  overlay.appendChild(grid)
  container.appendChild(overlay)

  function updateLabel() {
    presetLabel.textContent = `Preset: ${detectPreset(getConfig())}`
  }
  updateLabel()

  return {
    elem: overlay,
    destroy: () => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay) },
    updateLabel,
  }
}
