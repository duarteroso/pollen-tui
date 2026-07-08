import { BoxRenderable, Renderable } from "@opentui/core"
import { renderer } from "./renderer"

const app = new BoxRenderable(renderer, { id: "screen", flexGrow: 1 })
renderer.root.add(app)

export function removeScreen() {
  for (const child of [...app.getChildren()]) {
    child.destroy()
  }
}

export function showScreen(newRenderable: Renderable) {
  app.add(newRenderable)
}
