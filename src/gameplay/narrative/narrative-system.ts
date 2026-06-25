import {
  NarrativeEngine,
  NarrativeDocumentV2,
  analyzeDocument,
  eventBus,
} from "@automagically/narrative-core"

export interface NarrativeScene {
  nodeId: string
  sceneId: string
  title: string
  blocks: Array<{
    type: string
    text?: string
    characterId?: string
    url?: string
  }>
  choices: Array<{
    id: string
    label: string
  }>
}

export interface NarrativeState {
  currentNodeId: string
  history: string[]
}

export type NarrativeEventCallback = (event: {
  eventId: string
  payload: Record<string, unknown>
  sceneId?: string
}) => void

export class NarrativeSystem {
  private engine: NarrativeEngine
  private state: ReturnType<NarrativeEngine["initializeState"]> | null = null
  private currentDocument: NarrativeDocumentV2

  constructor(document: NarrativeDocumentV2) {
    this.currentDocument = document
    this.engine = new NarrativeEngine(document)
  }

  loadDocument(document: NarrativeDocumentV2): void {
    this.currentDocument = document
    this.engine.updateDocument(document)
    this.state = null
  }

  get analysis() {
    return analyzeDocument(this.currentDocument)
  }

  start(): NarrativeState {
    this.state = this.engine.initializeState()
    return this.toState()
  }

  getCurrentScene(): NarrativeScene | null {
    if (!this.state) return null

    const scene = this.engine.getCurrentScene(this.state)
    if (!scene) return null

    const transitions = this.engine.getAvailableTransitions(this.state)

    return {
      nodeId: this.state.currentNodeId,
      sceneId: scene.id,
      title: scene.title,
      blocks: scene.blocks.map((b) => {
        const block: Record<string, unknown> = { type: b.type }
        if (b.type === "paragraph" || b.type === "action") {
          const payload = b.payload as { text: string }
          block.text = this.engine.interpolateText(payload.text, this.state!.variables)
        }
        if (b.type === "dialogue") {
          const payload = b.payload as { characterId: string; text: string }
          block.characterId = payload.characterId
          block.text = this.engine.interpolateText(payload.text, this.state!.variables)
        }
        if (b.type === "image") {
          const payload = b.payload as { url: string }
          block.url = payload.url
        }
        return block
      }),
      choices: transitions.map((t) => ({
        id: t.id,
        label: this.engine.interpolateText(t.label, this.state!.variables),
      })),
    }
  }

  choose(transitionId: string): NarrativeState {
    if (!this.state) throw new Error("Game not started. Call start() first.")
    this.state = this.engine.takeTransition(this.state, transitionId)
    return this.toState()
  }

  getVariable(name: string): unknown {
    return this.state?.variables[name]
  }

  setVariable(name: string, value: unknown): void {
    if (this.state) {
      this.state.variables[name] = value
    }
  }

  onEvent(eventId: string, callback: NarrativeEventCallback): () => void {
    return eventBus.subscribe(eventId, (event) => {
      callback({
        eventId: event.eventId,
        payload: event.payload,
        sceneId: event.context.sceneId,
      })
    })
  }

  private toState(): NarrativeState {
    return {
      currentNodeId: this.state!.currentNodeId,
      history: this.state!.history,
    }
  }
}
