type TTarget = {
  key: string,
  value: {
    label: string,
    platform: string,
    arch: string,
    ext: string
  }
}

export const targets: TTarget[] = [
  {
    key: "bun-darwin-arm64",
    value: {
      label: "macOS (Apple Silicon)",
      platform: "macos",
      arch: "",
      ext: ""
    }
  },
  {
    key: "bun-linux-x64",
   value: {
     label: "Linux x64",
     platform: "linux",
     arch: "x64",
     ext: ""
   }
  },
  {
    key: "bun-linux-arm64",
   value: {
     label: "Linux ARM64",
     platform: "linux",
     arch: "arm64",
      ext: ""
    }
  },
  {
    key: "bun-windows-x64",
    value: {
      label: "Windows x64",
      platform: "windows",
      arch: "x64",
      ext: ".exe"
    }
  },
  {
    key: "bun-windows-arm64",
    value: {
      label: "Windows ARM64",
      platform: "windows",
      arch: "arm64",
      ext: ".exe"
    }
  }
]