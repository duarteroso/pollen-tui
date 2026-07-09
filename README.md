# pollen-cat

A terminal UI for Catalonia's pollen forecasts, built with [OpenTUI](https://git.new/create-tui).

This is application was made possible thanks to the [AeroBiologia.cat](https://aerobiologia.cat/pia/en/). All credits to them!

Useful links:
* [License](https://creativecommons.org/licenses/by-nc-sa/4.0/)
* [Terms](https://aerobiologia.cat/pia/en/terms)
* [API](https://aerobiologia.cat/pia/en/api)

## Prerequisites

- [Bun](https://bun.sh)
- [Just](https://just.systems)

## Installation

```bash
bun install
```

## Usage

All commands are run through `just`:

```bash
just run_dev          # Run in debug mode (with DEBUG feature enabled)
just run_release      # Run in release mode
just build_debug      # Build debug binary
just build_release    # Build release binary
```

Binaries are output to `bin/<platform>/<arch>/pollen-cat` for the following targets:

| Target | Platform |
|--------|----------|
| macOS (Apple Silicon) | `bin/macos/` |
| Linux x64 | `bin/linux/x64/` |
| Linux ARM64 | `bin/linux/arm64/` |
| Windows x64 | `bin/windows/x64/` |
| Windows ARM64 | `bin/windows/arm64/` |

This project was created using `bun create tui`. [create-tui](https://git.new/create-tui) is the easiest way to get started with OpenTUI.
