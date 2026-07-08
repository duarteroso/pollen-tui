import type { BoxRenderable, TextRenderable } from "@opentui/core";

export function updateBoxes(map: Map<string, BoxRenderable>, isSelect: (s: string) => boolean) {
  for (const [key, value] of map) {
    const selected = isSelect(key)
    value.backgroundColor = selected ? "white" : "transparent";
    //
    const child = value.getChildren()[0] as TextRenderable;
    if (child) {
      child.fg = selected ? "black" : "white";
    } else {
      console.error("No child found")
    }
  }
}
