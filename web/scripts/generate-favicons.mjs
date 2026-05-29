#!/usr/bin/env node
/**
 * Generate favicon set from public/brand-logo.png
 * Run: node scripts/generate-favicons.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");
const src = path.join(publicDir, "brand-logo.png");

if (!fs.existsSync(src)) {
  console.error("Missing brand-logo.png in public/");
  process.exit(1);
}

const sizes = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
];

for (const [name, size] of sizes) {
  await sharp(src)
    .resize(size, size, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(publicDir, name));
  console.log("Wrote", name);
}

const icoBuffers = await Promise.all(
  [16, 32, 48].map((size) => sharp(src).resize(size, size, { fit: "cover" }).png().toBuffer())
);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), await toIco(icoBuffers));
console.log("Wrote favicon.ico");
