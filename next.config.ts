import type { NextConfig } from "next";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

let loaderPath: string | undefined;
try {
  loaderPath = require.resolve("orchids-visual-edits/loader.js");
} catch {
  // orchids-visual-edits not installed — skip the custom loader
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, "../../"),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...(loaderPath
    ? {
        turbopack: {
          rules: {
            "*.{jsx,tsx}": {
              loaders: [loaderPath],
            },
          },
        },
      }
    : {}),
};

export default nextConfig;
