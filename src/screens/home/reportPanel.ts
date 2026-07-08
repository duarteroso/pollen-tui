import { BoxRenderable, ScrollBoxRenderable, TextRenderable } from "@opentui/core";
import { renderer } from "../../renderer";
import { DataStore, type DataChangeUnsubscribe } from "../../data";
import type { Entry } from "../../model/entry";
import { Level, LevelToColor } from "../../model/level";
import { Forecast } from "../../model/forecast";
import { getEnumKey } from "../../utils/enum";
import type { IPanel } from "../panel";

export class ReportPanel implements IPanel {
  id: string = "report_panel"

  private root: BoxRenderable | null = null;
  private dataStoreUnregister: DataChangeUnsubscribe | null = null;

  private cachedEntries: BoxRenderable[] = [];
  private entryNameId: string = "nameId";
  private entryLevelId: string = "levelId";
  private entryForecastId: string = "forecastId";


  private buildText(textId: string): BoxRenderable {
    const root = new BoxRenderable(renderer, {
      width: "33%",
      justifyContent: "center",
      alignItems: "center",
    });
    //
    root.add(
      new TextRenderable(renderer, {
        id: textId,
        flexGrow: 1
      }));
    //
    return root;
  }

  private createEntry(): void {
    const entry = new BoxRenderable(renderer, {
      flexDirection: "row",
      justifyContent: "space-between",
      focusable: false
    });
    //
    entry.add(this.buildText(this.entryNameId));
    entry.add(this.buildText(this.entryLevelId));
    entry.add(this.buildText(this.entryForecastId));
    //
    this.cachedEntries.push(entry);
    this.root?.add(entry);
  }

  private setupEntry(entry: Entry, entryBox: BoxRenderable): void {
    var text = entryBox.findDescendantById(this.entryNameId) as TextRenderable;
    text.content = entry.name;
    //
    text = entryBox.findDescendantById(this.entryLevelId) as TextRenderable;
    text.content = `${Level[entry.level]}`;
    var parent = text.parent as BoxRenderable;
    parent.backgroundColor = LevelToColor(entry.level);
    //
    text = entryBox.findDescendantById(this.entryForecastId) as TextRenderable;
    text.content = `${getEnumKey(Forecast, entry.forecast)}`;
  }

  private buildPanel() {
    const report = DataStore.get().report;
    if (!report) {
      return;
    }
    //
    let entries: Entry[] = [];
    entries.push(...report.pollens)
    entries.push(...report.spores);
    const sortedEntries = entries.sort((a, b) => a.name.localeCompare(b.name));
    //
    if (this.cachedEntries.length < entries.length) {
      const count = entries.length - this.cachedEntries.length;
      // Create missing
      for (let index = 0; index < count; index++) {
        this.createEntry();
      }
    }
    //
    for (let index = 0; index < sortedEntries.length; index++) {
      this.setupEntry(sortedEntries[index]!, this.cachedEntries[index]!);
    }
  }

  build(): BoxRenderable {
    this.root = new ScrollBoxRenderable(renderer, {
      id: this.id,
      title: "Report",
      borderStyle: "heavy",
      flexGrow: 1,
      focusable: false
    })
    //
    this.buildPanel();
    this.dataStoreUnregister = DataStore.get().setListener(() => this.buildPanel())
    //
    return this.root;
  }

  destroy(): void {
    this.dataStoreUnregister?.();
    //
    this.root?.destroyRecursively();
    this.root = null;
  }
}
