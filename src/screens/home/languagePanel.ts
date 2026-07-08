import { BoxRenderable, KeyEvent, ScrollBoxRenderable, TextRenderable } from "@opentui/core";
import { Language } from "../../model/language";
import { renderer } from "../../renderer";
import { updateBoxes } from "./common";
import { DataStore, type DataChangeUnsubscribe } from "../../data";
import { cycleEnum, getEnumKey } from "../../utils/enum";
import type { IPanel } from "../panel";

export class LanguagePanel implements IPanel {
  id: string = "language_panel"

  private root: BoxRenderable | null = null;
  private languageBoxes: Map<string, BoxRenderable> = new Map();
  private dataStopUnsubscribe: DataChangeUnsubscribe | null = null;

  build(): BoxRenderable {
    this.root = new ScrollBoxRenderable(renderer, {
      id: this.id,
      title: "Language",
      borderStyle: "rounded",
      maxWidth: 20,
      maxHeight: 5,
    })
    //
    this.root.onKeyDown = async (key: KeyEvent): Promise<void> => {
      let value = 0;
      if (key.name === "up") { value = -1; }
      else if (key.name === "down") { value = 1; }
      else { return; }
      //
      const oldLang = DataStore.get().getLanguage();
      const newLang = cycleEnum(Language, oldLang, value);
      await DataStore.get().setLanguage(newLang);
    }
    
    // Create entries
    for (const [key, value] of Object.entries(Language) as [keyof typeof Language, Language][]) {
      const langBox = new BoxRenderable(renderer, {
        onMouseDown: async(): Promise<void> => {
          await DataStore.get().setLanguage(value)
        }
      });
      langBox.add(new TextRenderable(renderer, { content: `${value}` }));
      this.root.add(langBox)
      //
      this.languageBoxes.set(key, langBox)
    }
    //
    this.dataStopUnsubscribe = DataStore.get().setListener(() => {
      const lang = DataStore.get().getLanguage()
      updateBoxes(
        this.languageBoxes,
        (selection: string): boolean => {
          return getEnumKey(Language, lang) === selection;
        });
    })
    //
    return this.root;
  }

  destroy(): void {
    this.dataStopUnsubscribe?.();
    this.languageBoxes.clear();
    //
    this.root?.destroyRecursively();
    this.root = null;
  }
}
