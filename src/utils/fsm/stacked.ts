import { StateMachine } from "./machine";
import type { IState } from "./state";

export class StackedStateMachine extends StateMachine {
  private states: IState[] = []

  pushState<T extends IState>(state: T) {
    this.states.push(state);
    super.setState(state);
  }

  popState() {
    this.states.pop();
    const state = this.states.at(-1);
    super.setState(state)
  }
}
