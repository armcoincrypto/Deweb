import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/images/blog");
fs.mkdirSync(outDir, { recursive: true });

const covers = [
  {
    file: "default-blog-cover.jpg",
    label: "DEWEB",
    title: "Insights & Guides",
    accent: "#22d3ee",
    accent2: "#0891b2",
  },
  {
    file: "shopify-cover.jpg",
    label: "DEWEB",
    title: "Shopify & E-commerce",
    accent: "#96f2d7",
    accent2: "#22d3ee",
  },
  {
    file: "ai-automation-cover.jpg",
    label: "DEWEB",
    title: "AI & Automation",
    accent: "#a78bfa",
    accent2: "#22d3ee",
  },
  {
    file: "saas-cover.jpg",
    label: "DEWEB",
    title: "SaaS Development",
    accent: "#60a5fa",
    accent2: "#22d3ee",
  },
  {
    file: "marketplace-cover.jpg",
    label: "DEWEB",
    title: "Marketplace",
    accent: "#f472b6",
    accent2: "#22d3ee",
  },
  {
    file: "web-development-cover.jpg",
    label: "DEWEB",
    title: "Web Development",
    accent: "#34d399",
    accent2: "#22d3ee",
  },
];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function coverSvg({ label, title, accent, accent2 }) {
  const safeLabel = escapeXml(label);
  const safeTitle = escapeXml(title);
  return `<svg width="1600" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050b14"/>
      <stop offset="55%" stop-color="#0b1628"/>
      <stop offset="100%" stop-color="#071018"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="28%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accent2}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${accent2}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${accent2}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <rect width="1600" height="1000" fill="url(#glow)"/>
  <circle cx="220" cy="780" r="280" fill="${accent}" opacity="0.08"/>
  <circle cx="1320" cy="180" r="220" fill="${accent2}" opacity="0.12"/>
  <rect x="0" y="860" width="1600" height="2" fill="url(#line)"/>
  <text x="96" y="140" fill="${accent}" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" letter-spacing="8">${safeLabel}</text>
  <text x="96" y="260" fill="#f8fafc" font-family="Arial, Helvetica, sans-serif" font-size="78" font-weight="700">${safeTitle}</text>
  <text x="96" y="330" fill="#94a3b8" font-family="Arial, Helvetica, sans-serif" font-size="34">dewebam.com/blog</text>
</svg>`;
}

for (const cover of covers) {
  const svg = coverSvg(cover);
  const outPath = path.join(outDir, cover.file);
  await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(outPath);
  console.log(`Wrote ${outPath}`);
}

console.log("Blog cover images generated.");
