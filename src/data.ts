import { fetchData } from "./api/report";
import { Language, LanguageToCode } from "./model/language";
import { Location } from "./model/location";
import type { Report } from "./model/report";

export type DataChangeListener = () => void;
export type DataChangeUnsubscribe = () => void

export class DataStore {
  private static instance = new DataStore();
  static get(): DataStore { return this.instance; }

  report: Report | null = null;

  // Location
  private currentLocation: Location = Location.Barcelona;
  getLocation(): Location {
    return this.currentLocation;
  }
  async setLocation(loc: Location) {
    this.currentLocation = loc;
    await this.updateReport();
  }

  // Language
  private currentLanguage: Language = Language.English
  getLanguage(): Language {
    return this.currentLanguage;
  }
  async setLanguage(lang: Language) {
    this.currentLanguage = lang;
    await this.updateReport();
  }

  // Listeners
  private listeners = new Set<DataChangeListener>();
  setListener(listener: DataChangeListener): DataChangeUnsubscribe {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); }
  }

  async updateReport() {
    const loc = this.currentLocation.toLowerCase();
    const lang = LanguageToCode(this.currentLanguage).toLowerCase();
    const newReport = await fetchData(loc, lang);
    if (newReport) {
      this.report = newReport;
      this.notify();
    }
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}
