import { DEBUG } from "./features";
import { targets } from "./targets";

for (const target of targets) {
  await Bun.build({
    entrypoints: ["./src/index.ts"],
    define: {
      BUILD_VERSION: '"2026.7.3"',
    },
    features: [
      DEBUG
    ],
    minify: true,
    compile: {
      target: target.key as Bun.Build.CompileTarget,
      outfile: `./bin/${target.value.platform}/${target.value.arch}/pollen-cat`,
    },
  });
  //
  console.log(`Build ${target.key} complete!`);
}

console.log("Build complete!");
