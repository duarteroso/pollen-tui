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
  private entriesId = "entries"

  private buildText(content: string, bg?: string): BoxRenderable {
    const root = new BoxRenderable(renderer, {
      width: "33%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: bg,
    });
    //
    root.add(
      new TextRenderable(renderer, {
        content: content,
        flexGrow: 1
      }));
    //
    return root;
  }

  private buildEntry(entry: Entry): BoxRenderable {
    const root = new BoxRenderable(renderer, {
      id: entry.tag,
      flexDirection: "row",
      justifyContent: "space-between",
      focusable: false
    });
    //
    root.add(this.buildText(entry.name))
    root.add(this.buildText(`${Level[entry.level]}`, LevelToColor(entry.level)))
    root.add(this.buildText(`${getEnumKey(Forecast, entry.forecast)}`))
    //
    return root;
  }

  private buildPanel() {
    const report = DataStore.get().report;
    if (!report) {
      return;
    }
    // Clean up old data
    const oldEntriesBox = this.root?.findDescendantById(this.entriesId);
    if (oldEntriesBox) {
      oldEntriesBox.destroyRecursively();
    }
    // Build new data
    const newEntriesBox = new BoxRenderable(renderer, {
      id: this.entriesId,
      focusable: false
    });
    //
    let entries: Entry[] = [];
    entries.push(...report.pollens)
    entries.push(...report.spores);
    const sortedEntries = entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of sortedEntries) {
      newEntriesBox.add(this.buildEntry(entry))
    }
    //
    this.root?.add(newEntriesBox);
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
