import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: true });
  console.log("[DEWEB] Loaded env from:", envPath);
} else {
  console.warn("[DEWEB] No .env file at:", envPath);
}

console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY?.trim());
console.log("TELEGRAM_BOT configured:", !!process.env.TELEGRAM_BOT_TOKEN?.trim());
console.log("TELEGRAM_ADMIN configured:", !!process.env.TELEGRAM_ADMIN_USER_ID?.trim());
