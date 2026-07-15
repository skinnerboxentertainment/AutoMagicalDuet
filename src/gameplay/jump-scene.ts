import { Application, Container, Graphics, Text, TextStyle } from "pixi.js"
import { PlayerState, Platform, Particle, InputState, MovementConfig } from "./physics/types"
import { applyPhysics } from "./physics/movement"
import { PRESETS, PRESET_NAMES } from "./presets"
import { InputManager } from "../core/input-manager"
import { createTuningPanel } from "./tuning-panel"

const PLAYER_SIZE = 32

function buildPlatforms(w: number, h: number): Platform[] {
  return [
    { x: 0, y: h - 40, width: w, height: 40 },
    { x: -40, y: 0, width: 40, height: h },
    { x: w, y: 0, width: 40, height: h },
    { x: Math.floor(w * 0.15), y: h - 140, width: 180, height: 20 },
    { x: Math.floor(w * 0.4), y: h - 260, width: 140, height: 20 },
    { x: Math.floor(w * 0.6), y: h - 380, width: 120, height: 20 },
    { x: Math.floor(w * 0.3), y: h - 200, width: 40, height: 40 },
    { x: Math.floor(w * 0.4), y: h - 58, width: Math.floor(w * 0.3), height: 10, isHazard: true },
  ]
}

export class JumpScene {
  private app: Application
  private input: InputManager
  private gameContainer: Container
  private player!: PlayerState
  private config!: MovementConfig
  private inputState!: InputState
  private platforms: Platform[] = []
  private particles: Particle[] = []

  private playerGfx: Graphics
  private platformGfx: Graphics
  private particleGfx: Graphics
  private trailGfx: Graphics
  private hudText: Text
  private presetText: Text
  private presetIdx = 1

  private gamepadIndex: number | null = null
  private prevGamepadButtons: boolean[] = []
  private worldW: number
  private worldH: number
  private tuningPanel: { elem: HTMLDivElement; destroy: () => void; updateLabel: () => void } | null = null
  private panelVisible = false

  constructor(app: Application, input: InputManager, w: number, h: number) {
    this.app = app
    this.input = input
    this.worldW = w
    this.worldH = h
    this.gameContainer = new Container()
    app.stage.addChild(this.gameContainer)

    this.config = PRESETS[PRESET_NAMES[this.presetIdx]]
    this.inputState = {
      left: false, right: false, up: false, down: false,
      jump: false, jumpPressedThisFrame: false,
    }
    this.initScene()

    this.trailGfx = new Graphics()
    this.platformGfx = new Graphics()
    this.particleGfx = new Graphics()
    this.playerGfx = new Graphics()
    this.gameContainer.addChild(this.trailGfx)
    this.gameContainer.addChild(this.platformGfx)
    this.gameContainer.addChild(this.particleGfx)
    this.gameContainer.addChild(this.playerGfx)

    const style = new TextStyle({ fontFamily: "monospace", fontSize: 14, fill: "#888" })
    this.hudText = new Text({ text: "", style })
    this.hudText.x = 10
    this.hudText.y = 10
    this.gameContainer.addChild(this.hudText)

    const presetStyle = new TextStyle({ fontFamily: "monospace", fontSize: 16, fill: "#6a5acd", fontWeight: "bold" })
    this.presetText = new Text({ text: "", style: presetStyle })
    this.presetText.x = 10
    this.presetText.y = this.worldH - 30
    this.gameContainer.addChild(this.presetText)

    this.setupGamepad()
    this.setupTuningPanel()
    window.addEventListener("keydown", (e) => { if (e.code === "Tab") e.preventDefault() })
  }

  private initScene() {
    this.player = this.createPlayer()
    this.platforms = buildPlatforms(this.worldW, this.worldH)
    this.particles = []
  }

  private createPlayer(): PlayerState {
    return {
      x: 100, y: this.worldH - 100,
      vx: 0, vy: 0,
      width: PLAYER_SIZE, height: PLAYER_SIZE,
      isGrounded: false, isJumping: false, wasJumping: false,
      coyoteTimer: 0, jumpBufferTimer: 0,
      squashX: 1, squashY: 1,
      isDead: false, deathTimer: 0,
      currentJumpTime: 0, jumpState: "Ground",
      trail: [],
      jumpStartHeight: 0, jumpStartX: 0, jumpStartTime: 0, peakHeight: 0, airJumpsUsed: 0,
      isWallSliding: false, wallDir: 0,
    }
  }

  resize(w: number, h: number) {
    this.worldW = w
    this.worldH = h
    this.initScene()
    this.presetText.y = h - 30
  }

  private setupGamepad() {
    const onConnected = (e: GamepadEvent) => {
      this.gamepadIndex = e.gamepad.index
      this.prevGamepadButtons = []
    }
    const onDisconnected = () => { this.gamepadIndex = null }
    window.addEventListener("gamepadconnected", onConnected)
    window.addEventListener("gamepaddisconnected", onDisconnected)
  }

  private pollGamepad(): { axis: number; jump: boolean; jumpJustPressed: boolean } {
    if (this.gamepadIndex === null) return { axis: 0, jump: false, jumpJustPressed: false }
    const gp = navigator.getGamepads()[this.gamepadIndex]
    if (!gp) return { axis: 0, jump: false, jumpJustPressed: false }

    let axis = gp.axes[0] ?? 0
    if (Math.abs(axis) < 0.3) axis = 0
    if (axis === 0) {
      const dx = gp.buttons[14]?.pressed ? -1 : gp.buttons[15]?.pressed ? 1 : 0
      if (dx) axis = dx
    }

    const jumpBtn = gp.buttons[0]?.pressed ?? false
    const dpadUp = gp.buttons[12]?.pressed ?? false
    const jump = jumpBtn || dpadUp
    if (this.prevGamepadButtons.length === 0) this.prevGamepadButtons = gp.buttons.map(() => false)
    const jumpJustPressed = (jump && !this.prevGamepadButtons[0]) || (dpadUp && !this.prevGamepadButtons[12])
    this.prevGamepadButtons = gp.buttons.map(b => b.pressed)

    return { axis, jump, jumpJustPressed }
  }

  update(dt: number) {
    const keys = this.input.keys
    const justPressed = this.input.keysJustPressed
    const gp = this.pollGamepad()

    this.inputState.left = keys.has("ArrowLeft") || keys.has("KeyA") || gp.axis < -0.3
    this.inputState.right = keys.has("ArrowRight") || keys.has("KeyD") || gp.axis > 0.3
    this.inputState.jump = keys.has("Space") || keys.has("ArrowUp") || keys.has("KeyW") || gp.jump
    this.inputState.jumpPressedThisFrame = justPressed.has("Space") || justPressed.has("ArrowUp") || justPressed.has("KeyW") || gp.jumpJustPressed

    for (let i = 0; i < 4; i++) {
      applyPhysics(this.player, this.config, this.inputState, dt / 4, this.platforms, this.particles)
      this.inputState.jumpPressedThisFrame = false
    }

    if (justPressed.has("KeyP") || justPressed.has("NumpadAdd")) {
      this.presetIdx = (this.presetIdx + 1) % PRESET_NAMES.length
      this.config = { ...PRESETS[PRESET_NAMES[this.presetIdx]] }
      this.player = this.createPlayer()
      if (this.tuningPanel) this.tuningPanel.updateLabel()
    }

    if (justPressed.has("Tab")) {
      this.panelVisible = !this.panelVisible
      if (this.tuningPanel) this.tuningPanel.elem.style.display = this.panelVisible ? "block" : "none"
    }

    this.render()
  }

  private render() {
    const s = this.player

    this.playerGfx.clear()
    const cx = s.x + s.width / 2
    const cy = s.y + s.height / 2
    const sw = s.width * s.squashX
    const sh = s.height * s.squashY
    if (s.isDead) {
      this.playerGfx.rect(cx - sw / 2, cy - sh / 2, sw, sh)
      this.playerGfx.fill({ color: 0xf43f5e, alpha: 0.6 })
    } else if (s.isWallSliding) {
      this.playerGfx.rect(cx - sw / 2, cy - sh / 2, sw, sh)
      this.playerGfx.fill({ color: 0xf59e0b })
      this.playerGfx.rect(s.wallDir > 0 ? cx + sw / 2 - 4 : cx - sw / 2, cy - sh / 2, 4, sh)
      this.playerGfx.fill({ color: 0xf59e0b, alpha: 0.4 })
    } else {
      this.playerGfx.rect(cx - sw / 2, cy - sh / 2, sw, sh)
      this.playerGfx.fill({ color: s.isGrounded ? 0x4ade80 : 0x6a5acd })
    }

    this.trailGfx.clear()
    for (let i = 0; i < s.trail.length; i++) {
      const t = s.trail[i]
      const alpha = 0.1 + 0.3 * (i / s.trail.length)
      this.trailGfx.circle(t.x, t.y, 3)
      this.trailGfx.fill({ color: 0x6a5acd, alpha })
    }

    this.platformGfx.clear()
    for (const p of this.platforms) {
      this.platformGfx.rect(p.x, p.y, p.width, p.height)
      this.platformGfx.fill({ color: p.isHazard ? 0xef4444 : 0x2a2a3e, alpha: p.isHazard ? 0.5 : 1 })
    }

    this.particleGfx.clear()
    for (const p of this.particles) {
      const alpha = Math.max(0, p.life / p.maxLife)
      this.particleGfx.circle(p.x, p.y, p.size * alpha)
      this.particleGfx.fill({ color: 0xd4d4d8, alpha })
    }

    const wallInfo = s.isWallSliding ? ` wall:${s.wallDir}` : ""
    this.hudText.text = `vx: ${Math.round(s.vx)}  vy: ${Math.round(s.vy)}  ground: ${s.isGrounded}  air: ${this.config.maxAirJumps - s.airJumpsUsed}/${this.config.maxAirJumps}${wallInfo}  state: ${s.jumpState}  [Tab] Tuning  [P] Presets`
    this.presetText.text = `[P] Preset: ${PRESET_NAMES[this.presetIdx]}  [Tab] Tune`
  }

  private setupTuningPanel() {
    const wrapper = document.getElementById("game-container")
    if (!wrapper) return
    this.tuningPanel = createTuningPanel(
      wrapper,
      () => this.config,
      (c) => { this.config = c },
    )
  }

  destroy() {
    if (this.tuningPanel) this.tuningPanel.destroy()
    this.app.stage.removeChild(this.gameContainer)
    this.gameContainer.destroy({ children: true })
  }
}
