import { Application, Container, Graphics, Text, TextStyle, Sprite, Texture, TilingSprite, Assets } from "pixi.js"
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

const ASSETS = [
  "/assets/jumper/player_stand.png",
  "/assets/jumper/player_walk1.png",
  "/assets/jumper/player_walk2.png",
  "/assets/jumper/player_jump.png",
  "/assets/jumper/player_hurt.png",
  "/assets/jumper/ground.png",
  "/assets/jumper/hazard.png",
  "/assets/jumper/bg_sky.png",
]

export class JumpScene {
  static async preload(): Promise<void> {
    await Assets.load(ASSETS)
  }

  private app: Application
  private input: InputManager
  private gameContainer: Container
  private bgSprite: Sprite
  private player!: PlayerState
  private config!: MovementConfig
  private inputState!: InputState
  private platforms: Platform[] = []
  private particles: Particle[] = []

  private playerSprite: Sprite
  private playerContainer: Container
  private platformSprites: Container
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
  private texGround: Texture
  private texHazard: Texture
  private animTimer = 0
  private walkFrame = 0

  constructor(app: Application, input: InputManager, w: number, h: number) {
    this.app = app
    this.input = input
    this.worldW = w
    this.worldH = h
    this.gameContainer = new Container()
    this.bgSprite = new Sprite(Texture.from("/assets/jumper/bg_sky.png"))
    this.bgSprite.width = w
    this.bgSprite.height = h
    this.gameContainer.addChild(this.bgSprite)
    app.stage.addChild(this.gameContainer)

    this.texGround = Texture.from("/assets/jumper/ground.png")
    this.texHazard = Texture.from("/assets/jumper/hazard.png")

    this.config = PRESETS[PRESET_NAMES[this.presetIdx]]
    this.inputState = {
      left: false, right: false, up: false, down: false,
      jump: false, jumpPressedThisFrame: false,
    }

    this.playerContainer = new Container()
    this.playerSprite = new Sprite(Texture.from("/assets/jumper/player_stand.png"))
    this.playerSprite.anchor.set(0.5, 1)
    this.playerSprite.height = PLAYER_SIZE
    this.playerSprite.scale.x = this.playerSprite.scale.y
    this.playerContainer.addChild(this.playerSprite)
    this.gameContainer.addChild(this.playerContainer)

    this.platformSprites = new Container()
    this.gameContainer.addChild(this.platformSprites)

    this.trailGfx = new Graphics()
    this.particleGfx = new Graphics()
    this.gameContainer.addChild(this.trailGfx)
    this.gameContainer.addChild(this.particleGfx)

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

    this.initScene()
    this.setupGamepad()
    this.setupTuningPanel()
    window.addEventListener("keydown", (e) => { if (e.code === "Tab") e.preventDefault() })
  }

  private initScene() {
    this.player = this.createPlayer()
    this.platforms = buildPlatforms(this.worldW, this.worldH)
    this.particles = []
    this.rebuildPlatformSprites()
  }

  private rebuildPlatformSprites() {
    this.platformSprites.removeChildren()
    for (const p of this.platforms) {
      const spr = p.isHazard
        ? new Sprite(this.texHazard)
        : new TilingSprite({ texture: this.texGround, width: p.width, height: p.height })
      spr.x = p.x
      spr.y = p.y
      spr.width = p.width
      spr.height = p.height
      spr.alpha = p.isHazard ? 0.7 : 1
      this.platformSprites.addChild(spr)
    }
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
    this.bgSprite.width = w
    this.bgSprite.height = h
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

    this.render(dt)
  }

  private render(dt: number) {
    const s = this.player

    const cx = s.x + s.width / 2
    const cy = s.y + s.height / 2
    this.playerContainer.x = cx
    this.playerContainer.y = s.y + s.height
    this.playerContainer.scale.x = s.squashX * (s.vx < 0 ? -1 : 1)
    this.playerContainer.scale.y = s.squashY

    if (s.isWallSliding) {
      this.playerContainer.alpha = 0.7
      this.playerSprite.tint = 0xf59e0b
    } else if (s.isDead) {
      this.playerContainer.alpha = 0.6
      this.playerSprite.tint = 0xf43f5e
    } else if (s.isGrounded) {
      this.playerContainer.alpha = 1
      this.playerSprite.tint = 0xffffff
    } else {
      this.playerContainer.alpha = 1
      this.playerSprite.tint = 0xddddff
    }

    this.animTimer += dt
    const walking = s.isGrounded && Math.abs(s.vx) > 10
    let nextTex: string | null = null
    if (walking && this.animTimer > 0.12) {
      this.animTimer = 0
      this.walkFrame = 1 - this.walkFrame
      nextTex = this.walkFrame === 0 ? "/assets/jumper/player_walk1.png" : "/assets/jumper/player_walk2.png"
    } else if (s.isDead) {
      nextTex = "/assets/jumper/player_hurt.png"
    } else if (!s.isGrounded) {
      nextTex = "/assets/jumper/player_jump.png"
    } else if (!walking) {
      nextTex = "/assets/jumper/player_stand.png"
    }
    if (nextTex) {
      this.playerSprite.texture = Texture.from(nextTex)
      this.playerSprite.height = PLAYER_SIZE
      this.playerSprite.scale.x = this.playerSprite.scale.y
    }

    this.trailGfx.clear()
    for (let i = 0; i < s.trail.length; i++) {
      const t = s.trail[i]
      const alpha = 0.1 + 0.3 * (i / s.trail.length)
      this.trailGfx.circle(t.x, t.y, 3)
      this.trailGfx.fill({ color: 0x6a5acd, alpha })
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
