import type { Credits } from "./credits";
import type { Entry } from "./entry";

export interface Report {
    credits: Credits,
    start: Date
    end: Date
    pollens: Entry[]
    spores: Entry[]
}
