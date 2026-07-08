import type { Renderable } from "@opentui/core"

export interface IScreen {
  id: string
  build: () => Renderable
  destroy: () => void
}
