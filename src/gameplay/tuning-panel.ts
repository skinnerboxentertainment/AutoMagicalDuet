import { MovementConfig } from "./physics/types"
import { PRESETS } from "./presets"

interface ParamDef {
  key: keyof MovementConfig
  label: string
  min: number
  max: number
  step: number
  tip: string
}

const CANCEL_MODES = ["none", "partial", "full"] as const

const SLIDER_PARAMS: ParamDef[] = [
  { key: "maxSpeed", label: "Max Speed", min: 100, max: 1000, step: 10, tip: "Horizontal speed cap (px/s). Higher = faster run." },
  { key: "acceleration", label: "Acceleration", min: 500, max: 6000, step: 100, tip: "How fast the player reaches max speed on the ground." },
  { key: "deceleration", label: "Deceleration", min: 500, max: 6000, step: 100, tip: "How fast the player stops when releasing the key." },
  { key: "turnMultiplier", label: "Turn Multiplier", min: 0.5, max: 5, step: 0.1, tip: "Extra acceleration when reversing direction. Higher = snappier turns." },
  { key: "jumpForce", label: "Jump Force", min: 300, max: 1500, step: 10, tip: "Initial upward velocity. Higher = higher jumps." },
  { key: "gravity", label: "Gravity", min: 500, max: 4000, step: 50, tip: "Downward acceleration (px/s²). Higher = shorter, snappier jumps." },
  { key: "fallGravityMultiplier", label: "Fall Grav Mult", min: 1, max: 4, step: 0.1, tip: "Extra gravity while falling. >1 makes descents feel snappier." },
  { key: "terminalVelocity", label: "Terminal Vel", min: 500, max: 3000, step: 50, tip: "Max fall speed cap. Higher = faster max fall." },
  { key: "airControl", label: "Air Control", min: 0, max: 1, step: 0.05, tip: "Fraction of ground acceleration available in the air. 0 = no air steering, 1 = full control." },
  { key: "airFriction", label: "Air Friction", min: 0, max: 1500, step: 50, tip: "Horizontal deceleration while airborne with no input." },
  { key: "jumpCancelMode", label: "Cancel Mode", min: 0, max: 2, step: 1, tip: "none = fixed arc. partial = gravity spike on release. full = kill upward velocity instantly." },
  { key: "minJumpHold", label: "Min Hold (s)", min: 0, max: 0.2, step: 0.005, tip: "Minimum time jump is force-held. Prevents accidental short hops from light taps." },
  { key: "maxJumpHold", label: "Max Hold (s)", min: 0, max: 0.6, step: 0.01, tip: "Max time jump can be held. Longer = more variable height range." },
  { key: "earlyReleaseGravityMultiplier", label: "Early Release Grav", min: 1, max: 6, step: 0.1, tip: "Gravity spike when releasing jump early in partial mode. Higher = shorter hops." },
  { key: "elasticity", label: "Elasticity", min: 0, max: 2.5, step: 0.1, tip: "Intensity of squash & stretch on skid, takeoff, and landing. 0 = no deformation." },
  { key: "squashRecoveryRate", label: "Squash Recovery", min: 1, max: 40, step: 1, tip: "How fast the player snaps back to normal shape after squashing. Higher = snappier." },
  { key: "maxAirJumps", label: "Max Air Jumps", min: 0, max: 10, step: 1, tip: "Number of extra jumps allowed in the air. Wall slides reset this counter." },
  { key: "coyoteTime", label: "Coyote Time (s)", min: 0, max: 0.3, step: 0.005, tip: "Grace period after walking off a ledge where jump still works. Prevents 'I pressed jump!' frustration." },
  { key: "jumpBuffer", label: "Jump Buffer (s)", min: 0, max: 0.3, step: 0.005, tip: "Grace period before landing where jump input is queued. Makes tight jumps feel responsive." },
  { key: "wallSlideGravity", label: "Wall Slide Gravity", min: 0.05, max: 1, step: 0.05, tip: "Gravity multiplier while wall sliding. 0.3 = slow slide, 1 = normal fall." },
  { key: "wallJumpForce", label: "Wall Jump Force", min: 0, max: 1200, step: 10, tip: "Vertical launch when jumping off a wall. 0 = no wall jump." },
  { key: "wallJumpHorizontal", label: "Wall Jump Horiz", min: 0, max: 800, step: 10, tip: "Horizontal push away from the wall on wall jump." },
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
    { name: "Wall Slide", keys: ["wallSlideGravity", "wallJumpForce", "wallJumpHorizontal"] },
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

      const tipIcon = document.createElement("span")
      tipIcon.textContent = " ⓘ"
      tipIcon.style.cssText = "cursor:help;color:#555;font-size:11px;margin-left:4px;"
      tipIcon.title = def.tip

      if (key === "jumpCancelMode") {
        const label = document.createElement("div")
        label.style.cssText = "color:#888;font-size:12px;margin-bottom:2px;display:flex;align-items:center;"
        label.appendChild(document.createTextNode(def.label))
        label.appendChild(tipIcon)
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
        labelRow.style.cssText = "display:flex;justify-content:space-between;color:#888;font-size:12px;align-items:center;"
        const labelWrap = document.createElement("span")
        labelWrap.style.cssText = "display:flex;align-items:center;"
        const label = document.createElement("span")
        label.textContent = def.label
        labelWrap.appendChild(label)
        labelWrap.appendChild(tipIcon.cloneNode(true))
        const val = document.createElement("span")
        val.textContent = String(getConfig()[key as keyof MovementConfig] ?? 0)
        labelRow.appendChild(labelWrap)
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
