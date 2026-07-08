import { feature } from "bun:bundle"

// FEATURES
export const DEBUG: string = feature("DEBUG") ? "DEBUG" : ""
