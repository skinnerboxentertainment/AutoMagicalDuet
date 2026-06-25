import { describe, it, expect } from "vitest"
import {
  NarrativeDocumentV2Schema,
  analyzeDocument,
  NarrativeEngine,
  eventBus,
  type NarrativeDocumentV2,
} from "@automagically/narrative-core"
import fs from "fs"
import path from "path"

function loadFixture(): NarrativeDocumentV2 {
  const json = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../design/game-graph.json"), "utf-8")
  )
  return NarrativeDocumentV2Schema.parse(json) as unknown as NarrativeDocumentV2
}

describe("narrative-core", () => {
  it("test_schema_validates_game_graph", () => {
    const doc = loadFixture()
    expect(doc.metadata.title).toBe("AutoMagically Demo — Cat Grapple Platformer")
    expect(Object.keys(doc.topology.nodes)).toHaveLength(7)
    expect(Object.keys(doc.topology.transitions)).toHaveLength(7)
  })

  it("test_analysis_detects_graph_issues", () => {
    const doc = loadFixture()
    const result = analyzeDocument(doc)
    expect(result.unreachableNodes.length).toBeGreaterThanOrEqual(1)
    expect(result.brokenSceneRefs).toHaveLength(0)
    expect(result.brokenTransitionRefs).toHaveLength(0)
  })

  it("test_engine_initializes_state", () => {
    const doc = loadFixture()
    const engine = new NarrativeEngine(doc)
    const state = engine.initializeState()
    expect(state.currentNodeId).toBe("sys_movement")
    expect(state.variables.player_health).toBe(100)
    expect(state.variables.grapple_available).toBe(false)
    expect(state.history).toEqual(["sys_movement"])
  })

  it("test_engine_evaluates_conditions", () => {
    const doc = loadFixture()
    const engine = new NarrativeEngine(doc)
    const state = engine.initializeState()
    const transitions = engine.getAvailableTransitions(state)
    expect(transitions.length).toBeGreaterThanOrEqual(1)
  })

  it("test_event_bus_publishes_and_subscribes", () => {
    const events: string[] = []
    const unsub = eventBus.subscribe("test_event", (event) => {
      events.push(event.eventId)
    })
    eventBus.publish({ eventId: "test_event", payload: {}, context: { timestamp: Date.now() } })
    expect(events).toContain("test_event")
    unsub()
  })
})
