import { Forecast } from "./forecast"
import { Level } from "./level"

export interface Entry {
    tag: string
    name: string
    latin: string
    level: Level
    forecast: Forecast
}