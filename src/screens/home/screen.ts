import { BoxRenderable, KeyEvent, Renderable } from "@opentui/core";
import type { IScreen } from "../screen";
import { renderer } from "../../renderer";
import { LocationPanel } from "./locationPanel";
import { LanguagePanel } from "./languagePanel";
import { ReportPanel } from "./reportPanel";

export class HomeScreen implements IScreen {
  id: string = "home";

  root: BoxRenderable | null = null;
  locationPanel: LocationPanel | null = null;
  languagePanel: LanguagePanel | null = null;
  reportPanel: ReportPanel | null = null;

  private buildLeftPanel(): BoxRenderable {
    this.locationPanel = new LocationPanel();
    this.languagePanel = new LanguagePanel();
    //
    const panel = new BoxRenderable(renderer, {});
    panel.add(this.locationPanel.build())
    panel.add(this.languagePanel.build())
    //
    return panel;
  }

  private buildRightPanel(): BoxRenderable {
    this.reportPanel = new ReportPanel();
    //
    const panel = new BoxRenderable(renderer, {});
    panel.add(this.reportPanel.build())
    //
    return panel;
  }

  build(): Renderable {
    this.root = new BoxRenderable(renderer, {
      title: "\tPollen.cat\t",
      titleColor: "orange",
      titleAlignment: "center",
      borderStyle: "rounded",
      flexGrow: 1,
      flexDirection: "row"
    })
    this.root.add(this.buildLeftPanel())
    this.root.add(this.buildRightPanel())
    this.root.focus();
    //
    renderer.keyInput.on("keypress", (key: KeyEvent) => this.handleKeyPress(key));
    return this.root
  }

  private handleKeyPress(key: KeyEvent): void {
    let panel: Renderable | undefined = undefined;
    if (key.name === 'c') {
      panel = this.root?.findDescendantById(this.locationPanel?.id ?? "")
    }
    else if (key.name === 'l') {
      panel = this.root?.findDescendantById(this.languagePanel?.id ?? "")
    }
    //
    if (panel?.focused) { panel.blur(); }
    else { panel?.focus(); }
  }

  destroy(): void {
    renderer.keyInput.removeAllListeners("keypress");
    //
    this.locationPanel?.destroy();
    this.locationPanel = null;
    //
    this.languagePanel?.destroy();
    this.languagePanel = null;
    //
    this.reportPanel?.destroy();
    this.reportPanel = null;
    //
    this.root?.destroyRecursively()
    this.root = null;
  }
 }
