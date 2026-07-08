import { BoxRenderable, KeyEvent, ScrollBoxRenderable, TextRenderable } from "@opentui/core";
import { renderer } from "../../renderer";
import { updateBoxes } from "./common";
import { DataStore, type DataChangeUnsubscribe } from "../../data";
import { Location } from "../../model/location";
import { cycleEnum, getEnumKey } from "../../utils/enum";
import type { IPanel } from "../panel";

export class LocationPanel implements IPanel {
  id: string = "location_panel"

  private root: BoxRenderable | null = null;
  private locationBoxes: Map<string, BoxRenderable> = new Map();
  private dataStopUnsubscribe: DataChangeUnsubscribe | null = null;

  build(): BoxRenderable {
    this.root = new ScrollBoxRenderable(renderer, {
      id: this.id,
      title: "City",
      borderStyle: "rounded",
      maxWidth: 20,
      maxHeight: 15
    });
    //
    this.root.onKeyDown = async (key: KeyEvent): Promise<void> => {
      let value = 0;
      if (key.name === "up") { value = -1; }
      else if (key.name === "down") { value = 1; }
      else { return; }
      //
      const oldLoc = DataStore.get().getLocation();
      const newLoc = cycleEnum(Location, oldLoc, value);
      await DataStore.get().setLocation(newLoc)
    }
    
    // Create entries
    for (const [key, value] of Object.entries(Location) as [keyof typeof Location, Location][]) {
      const locBox = new BoxRenderable(renderer, {
        onMouseDown: async (): Promise<void> => {
          await DataStore.get().setLocation(value)
        },
      });
      locBox.add(new TextRenderable(renderer, { content: `${value}` }));
      this.root.add(locBox);
      //
      this.locationBoxes.set(key, locBox)
    }
    //
    this.dataStopUnsubscribe = DataStore.get().setListener(() => {
      const loc = DataStore.get().getLocation()
      updateBoxes(
        this.locationBoxes,
        (selection: string): boolean => {
          return getEnumKey(Location, loc) === selection;
        });
    })
    //
    return this.root;
  }

  destroy(): void {
    this.dataStopUnsubscribe?.();
    this.locationBoxes.clear();
    //
    this.root?.destroyRecursively();
    this.root = null;
  }
}
