import { BunCache } from "bun-cache";
import { fetchData } from "./api/report";
import { Language, LanguageToCode } from "./model/language";
import { Location } from "./model/location";
import type { Report } from "./model/report";

export type DataChangeListener = () => void;
export type DataChangeUnsubscribe = () => void

const bunChace = new BunCache({ persistent: true });

export class DataStore {
  private static instance = new DataStore();
  static get(): DataStore { return this.instance; }

  report: Report | null = null;

  constructor() {
    this.currentLocation = bunChace.get(this.currentLocationKey) as Location ?? Location.Barcelona;
    this.currentLanguage = bunChace.get(this.currentLanguageKey) as Language ?? Language.English;
  }

  // Location
  private currentLocation: Location = Location.Barcelona;
  private readonly currentLocationKey: string = "key_loc";
  getLocation(): Location {
    return this.currentLocation;
  }
  async setLocation(loc: Location) {
    this.currentLocation = loc;
    bunChace.put(this.currentLocationKey, this.currentLocation);
    await this.updateReport();
  }

  // Language
  private currentLanguage: Language = Language.English
  private readonly currentLanguageKey: string = "key_lang"
  getLanguage(): Language {
    return this.currentLanguage;
  }
  async setLanguage(lang: Language) {
    this.currentLanguage = lang;
    bunChace.put(this.currentLanguageKey, this.currentLanguage);
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
    }
    this.notify();
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}
