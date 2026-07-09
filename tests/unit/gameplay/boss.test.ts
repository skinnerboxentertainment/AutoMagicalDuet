import { describe, expect, it } from "vitest"
import { IronclawBoss } from "../../../src/gameplay/boss"

describe("IronclawBoss", () => {
  it("starts with all parts intact", () => {
    const boss = new IronclawBoss(800, 600)
    expect(boss.parts.length).toBe(4)
    expect(boss.getPart("armor")?.destroyed).toBe(false)
    expect(boss.getPart("turret-left")?.destroyed).toBe(false)
    expect(boss.getPart("turret-right")?.destroyed).toBe(false)
    expect(boss.getPart("core")?.active).toBe(false)
    expect(boss.phase).toBe(1)
  })

  it("armor takes 3 hits to destroy", () => {
    const boss = new IronclawBoss(800, 600)
    boss.hitPart("armor")
    boss.hitPart("armor")
    expect(boss.getPart("armor")?.destroyed).toBe(false)
    boss.hitPart("armor")
    expect(boss.getPart("armor")?.destroyed).toBe(true)
  })

  it("core activates and phase changes when armor destroyed + update called", () => {
    const boss = new IronclawBoss(800, 600)
    boss.hitPart("armor")
    boss.hitPart("armor")
    boss.hitPart("armor")
    boss.update(1 / 60, 300)
    expect(boss.phase).toBe(2)
    expect(boss.getPart("core")?.active).toBe(true)
  })

  it("becomes inactive when core is destroyed", () => {
    const boss = new IronclawBoss(800, 600)
    boss.hitPart("armor")
    boss.hitPart("armor")
    boss.hitPart("armor")
    boss.update(1 / 60, 300)
    boss.getPart("core")!.hp = 1
    boss.hitPart("core")
    boss.update(1 / 60, 300)
    expect(boss.active).toBe(false)
  })

  it("slide moves boss into position", () => {
    const boss = new IronclawBoss(800, 600)
    for (let i = 0; i < 30; i++) {
      if (boss.slideIn(1 / 60)) break
    }
    expect(boss.x).toBeLessThan(800)
  })
})
