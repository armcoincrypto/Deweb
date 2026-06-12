#!/usr/bin/env node
/**
 * Generate DEWEB "D" logo favicon set from public/brand-logo.png
 * Run: npm run favicons
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");
const appDir = path.join(__dirname, "../src/app");
const communityDir = path.join(__dirname, "../../deweb-community");
const src = path.join(publicDir, "brand-logo.png");

if (!fs.existsSync(src)) {
  console.error("Missing brand-logo.png in public/");
  process.exit(1);
}

const BG = { r: 5, g: 8, b: 22, alpha: 1 };

function resizeLogo(size) {
  const pad = Math.max(1, Math.round(size * 0.06));
  const inner = size - pad * 2;
  return sharp(src)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: BG })
    .sharpen({ sigma: size <= 32 ? 1.2 : 0.8 })
    .png({ compressionLevel: 9 });
}

const publicSizes = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
];

for (const [name, size] of publicSizes) {
  await resizeLogo(size).toFile(path.join(publicDir, name));
  console.log("Wrote public/", name);
}

const icoBuffers = await Promise.all(
  [16, 32, 48].map((size) => resizeLogo(size).toBuffer())
);
const faviconIco = await toIco(icoBuffers);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), faviconIco);
console.log("Wrote public/favicon.ico");

fs.mkdirSync(appDir, { recursive: true });
fs.writeFileSync(path.join(appDir, "favicon.ico"), faviconIco);
await resizeLogo(32).toFile(path.join(appDir, "icon.png"));
await resizeLogo(180).toFile(path.join(appDir, "apple-icon.png"));
console.log("Wrote src/app/favicon.ico, icon.png, apple-icon.png");

if (fs.existsSync(communityDir)) {
  fs.copyFileSync(src, path.join(communityDir, "brand-logo.png"));
  const communityFiles = [
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "brand-logo.png",
  ];
  for (const name of communityFiles) {
    fs.copyFileSync(path.join(publicDir, name), path.join(communityDir, name));
  }
  fs.copyFileSync(
    path.join(publicDir, "site.webmanifest"),
    path.join(communityDir, "site.webmanifest")
  );
  console.log("Synced D logo favicons to deweb-community/");
}
