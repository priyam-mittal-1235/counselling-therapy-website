import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Force clear the static development assets cache to resolve path issues in dev mode
try {
  const devStaticPath = path.join(process.cwd(), ".next", "static", "development");
  if (fs.existsSync(devStaticPath)) {
    fs.rmSync(devStaticPath, { recursive: true, force: true });
  }
} catch (e) {
  // Silent catch
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
