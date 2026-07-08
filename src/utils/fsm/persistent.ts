import { StateMachine } from "./machine";
import type { IState } from "./state";

export class PersistentStateMachine extends StateMachine {
  private states: Map<string, IState> = new Map();

  addState<T extends IState>(id: string, state: T) {
    this.states.set(id, state);
  }

  removeState(id: string) {
    if (this.states.has(id)) {
      this.states.delete(id)
    }
  }

  changeState(id: string) {
    if (this.states.has(id)) {
      const state = this.states.get(id)
      super.setState(state)
    }
  }
}
