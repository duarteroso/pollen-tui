
export enum Level { 
    Nil = 0,
    Low = 1,
    Medium = 2,
    High = 3,
    Max = 4
}

export function LevelToColor(level: Level): string {
  switch (level) {
    case Level.Nil: return "transparent";
    case Level.Low: return "green";
    case Level.Medium: return "orange";
    case Level.High: return "red"
    case Level.Max: return "purple"
  }
}