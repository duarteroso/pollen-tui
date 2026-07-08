import { PersistentStateMachine } from "./utils/fsm/persistent";
import { ScreenState } from "./screens/state";
import { HomeScreen } from "./screens/home/screen";
import { DataStore } from "./data";

const machine = new PersistentStateMachine()
machine.addState("home", new ScreenState<HomeScreen>(new HomeScreen()))
machine.changeState("home");
await DataStore.get().updateReport();