import type { IState } from "./state"

export class StateMachine {
  protected current?: IState = undefined

  protected setState(state?: IState) {
    if (state == this.current) {
      return;
    }
    //
    this.current?.onExit()
    this.current = state;
    this.current?.onEnter()
  }
}
