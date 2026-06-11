import fs from "fs";

export const IMAGE_QUALITY_PASS_SCORE = 70;
export const MAX_IMAGE_GENERATION_ATTEMPTS = 3;

function readPngDimensions(buffer) {
  if (!buffer || buffer.length < 24) return null;
  if (buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

/**
 * Heuristic image quality score (0–100) for blog hero images.
 * Used to pick the best of multiple generation attempts.
 */
export function scoreBlogImageFile(filePath, { categorySlug, attempt = 1 } = {}) {
  try {
    const stat = fs.statSync(filePath);
    const buffer = fs.readFileSync(filePath);
    const dims = readPngDimensions(buffer);

    let score = 50;

    if (dims) {
      if (dims.width >= 1536) score += 18;
      else if (dims.width >= 1024) score += 10;
      if (dims.height >= 1024) score += 12;
      else if (dims.height >= 768) score += 6;
      const ratio = dims.width / dims.height;
      if (ratio >= 1.4 && ratio <= 1.9) score += 8;
    }

    if (stat.size >= 400_000) score += 12;
    else if (stat.size >= 200_000) score += 8;
    else if (stat.size >= 100_000) score += 4;
    else if (stat.size < 40_000) score -= 15;

    if (categorySlug) score += 5;
    if (attempt > 1) score += 2;

    return Math.max(0, Math.min(100, Math.round(score)));
  } catch {
    return 0;
  }
}

export function isPoorImageQuality(score) {
  return score < IMAGE_QUALITY_PASS_SCORE;
}
