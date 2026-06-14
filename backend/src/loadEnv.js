import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ENV_FILE_PATH = path.resolve(__dirname, "../.env");

if (fs.existsSync(ENV_FILE_PATH)) {
  dotenv.config({ path: ENV_FILE_PATH, override: true });
  console.log("[DEWEB] Loaded env from:", ENV_FILE_PATH);
} else {
  console.warn("[DEWEB] No .env file at:", ENV_FILE_PATH);
}

function envSet(name) {
  return !!process.env[name]?.trim();
}

console.log("OPENAI_API_KEY exists:", envSet("OPENAI_API_KEY"));
console.log("TELEGRAM_BOT configured:", envSet("TELEGRAM_BOT_TOKEN"));
console.log("TELEGRAM_ADMIN configured:", envSet("TELEGRAM_ADMIN_USER_ID"));
console.log("X_API configured:", {
  hasApiKey: envSet("X_API_KEY"),
  hasApiSecret: envSet("X_API_SECRET"),
  hasAccessToken: envSet("X_ACCESS_TOKEN"),
  hasAccessTokenSecret: envSet("X_ACCESS_TOKEN_SECRET"),
  hasBearerToken: envSet("X_BEARER_TOKEN"),
});
