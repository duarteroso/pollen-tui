# Run for debug
run_dev:
    bun run dev

# Run for shipping
run_release:
    bun run release

# Build debug binary
build_debug:
    bun run                 \
    --feature DEBUG         \
    build/build.ts

# Build release binary
build_release:
    bun run                 \
    build/build.ts
