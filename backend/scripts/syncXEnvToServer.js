/**
 * Sync X_* vars from local backend/.env to production server .env (no git).
 * Usage: node scripts/syncXEnvToServer.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localEnv = path.resolve(__dirname, "../.env");
const remoteEnvPath = "/var/www/deweb/backend/.env";
const keys = [
  "X_API_KEY",
  "X_API_SECRET",
  "X_ACCESS_TOKEN",
  "X_ACCESS_TOKEN_SECRET",
  "X_BEARER_TOKEN",
  "SOCIAL_LINK_X",
];

dotenv.config({ path: localEnv, override: true });

let remote = execSync(`ssh deweb "cat ${remoteEnvPath}"`, { encoding: "utf8" });

for (const key of keys) {
  const value = process.env[key]?.trim();
  if (!value) {
    console.warn(`Skip ${key} — not set in local ${localEnv}`);
    continue;
  }
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, "m");
  remote = pattern.test(remote) ? remote.replace(pattern, line) : `${remote.trimEnd()}\n${line}\n`;
}

const tmp = path.join(__dirname, ".sync-env.tmp");
fs.writeFileSync(tmp, remote, "utf8");
execSync(`scp "${tmp}" deweb:${remoteEnvPath}`, { stdio: "inherit" });
fs.unlinkSync(tmp);

console.log("Synced to", remoteEnvPath);
for (const key of keys) {
  const value = process.env[key]?.trim();
  console.log(`${key}:`, value ? `set (${value.length} chars)` : "missing locally");
}
