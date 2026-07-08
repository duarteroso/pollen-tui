import { removeScreen, showScreen } from "../app";
import type { IState } from "../utils/fsm/state";
import type { IScreen } from "./screen";

export class ScreenState<T extends IScreen> implements IState {
  private screen: T

  constructor(screen: T) {
    this.screen = screen;
  }

  onEnter() {
    const build = this.screen.build()
    showScreen(build)
  }

  onExit() {
    this.screen.destroy();
    removeScreen()
  }
}
