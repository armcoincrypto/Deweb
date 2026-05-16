import { Router } from "express";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let catalogCache = null;

function loadCatalog() {
  if (catalogCache) return catalogCache;
  const file = path.join(__dirname, "../data/services-catalog.json");
  catalogCache = JSON.parse(readFileSync(file, "utf8"));
  return catalogCache;
}

router.get("/catalog", (_req, res) => {
  res.json({ catalog: loadCatalog() });
});

export default router;
