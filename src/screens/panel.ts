import type { Renderable } from "@opentui/core"

export interface IPanel {
  id: string
  build: () => Renderable
  destroy: () => void
}
