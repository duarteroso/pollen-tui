export enum Language {
  English = "English",
  Castellano = "Castellano",
  Catalan = "Catalan"
}

export function LanguageToCode(lang: Language): string {
  switch (lang) {
    case Language.English: return "en";
    case Language.Castellano: return "es";
    case Language.Catalan: return "ca";
  }
}