import { ConsolePosition, createCliRenderer } from "@opentui/core";
import { feature } from "bun:bundle"

export const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  useMouse: true,
  enableMouseMovement: true,
  autoFocus: false,
  consoleOptions: {
    position: ConsolePosition.BOTTOM,
    sizePercent: 30
  }
});

if (feature("DEBUG")) {
  renderer.toggleDebugOverlay()
  renderer.console.toggle()
}
