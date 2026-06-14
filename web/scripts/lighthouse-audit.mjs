#!/usr/bin/env node
/**
 * Lighthouse mobile audit for production homepage.
 * Usage: npm run lighthouse:audit
 *        npm run lighthouse:audit -- https://dewebam.com/en
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const url = process.argv[2] || "https://dewebam.com/en";
const outDir = path.join(process.cwd(), ".lighthouse");
const reportPath = path.join(outDir, "report.json");

fs.mkdirSync(outDir, { recursive: true });

console.log(`Running Lighthouse (mobile) on ${url}...`);

try {
  execSync(
    `npx --yes lighthouse "${url}" --only-categories=performance,accessibility,seo,best-practices --form-factor=mobile --screenEmulation.mobile=true --throttling.cpuSlowdownMultiplier=4 --output=json --output-path="${reportPath}" --chrome-flags="--headless --no-sandbox --disable-gpu" --quiet`,
    { stdio: "inherit", env: process.env }
  );
} catch {
  console.error("Lighthouse failed. Ensure Chrome/Chromium is available.");
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const scores = {
  performance: Math.round((report.categories.performance?.score ?? 0) * 100),
  accessibility: Math.round((report.categories.accessibility?.score ?? 0) * 100),
  seo: Math.round((report.categories.seo?.score ?? 0) * 100),
  bestPractices: Math.round((report.categories["best-practices"]?.score ?? 0) * 100),
};

const fcp = report.audits["first-contentful-paint"]?.displayValue;
const lcp = report.audits["largest-contentful-paint"]?.displayValue;
const tbt = report.audits["total-blocking-time"]?.displayValue;
const cls = report.audits["cumulative-layout-shift"]?.displayValue;

console.log("\n--- Lighthouse Scores (Mobile) ---");
console.log(`Performance:     ${scores.performance}`);
console.log(`Accessibility:   ${scores.accessibility}`);
console.log(`SEO:             ${scores.seo}`);
console.log(`Best Practices:  ${scores.bestPractices}`);
console.log(`FCP: ${fcp} | LCP: ${lcp} | TBT: ${tbt} | CLS: ${cls}`);
console.log(`Full report: ${reportPath}`);

const minPerf = 70;
if (scores.performance < minPerf) {
  console.warn(`\nWarning: Performance score ${scores.performance} is below target ${minPerf}.`);
}
