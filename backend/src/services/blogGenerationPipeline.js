import { generateBlogDraft, improveBlogDraft } from "./blogAi.js";
import { checkBlogQuality, BLOG_QUALITY_PASS_SCORE } from "./blogQualityCheck.js";
import { generateBlogFeaturedImage } from "./blogImageAi.js";
import { enrichDraftInternalLinks } from "./blogInternalLinks.js";
import { db } from "../db.js";

/**
 * Full AI blog pipeline: generate → quality check → improve if needed → featured image.
 * Never publishes — caller saves as pending_review.
 */
export async function runBlogGenerationPipeline({
  topic,
  targetKeyword,
  categoryName,
  categoryId,
  categorySlug = null,
  tone = "professional",
  wordCount = 2000,
  createdBy = null,
  regenerationHint = null,
  buyerStage = null,
  searchIntent = null,
  trendType = null,
  regenerationCount = null,
  rejectedFromPostId = null,
  rejectedFromPostTitle = null,
  originalRejectedPostId = null,
}) {
  let { generationId, draft } = await generateBlogDraft({
    topic,
    targetKeyword,
    categoryName,
    tone,
    wordCount,
    createdBy,
    regenerationHint,
    buyerStage,
    searchIntent,
  });

  let quality = checkBlogQuality(draft);
  let improved = false;
  const scoreBeforeImprove = quality.score;

  if (quality.score < BLOG_QUALITY_PASS_SCORE) {
    try {
      const improvedResult = await improveBlogDraft({
        draft,
        issues: quality.issues,
        suggestions: quality.suggestions,
        targetKeyword: targetKeyword || topic,
        categoryName,
      });
      draft = improvedResult.draft;
      improved = true;
      quality = checkBlogQuality(draft);
      draft.aiMeta = {
        ...draft.aiMeta,
        qualityImproved: true,
        qualityBeforeImprove: scoreBeforeImprove,
      };
    } catch (err) {
      console.warn("[blog-pipeline] Quality improve failed:", err.message);
      draft.aiMeta = { ...draft.aiMeta, qualityImproveError: err.message };
    }
  }

  const categoryRow = categoryId
    ? db.prepare("SELECT slug, name FROM blog_categories WHERE id = ?").get(categoryId)
    : null;
  const resolvedCategorySlug = categorySlug || categoryRow?.slug || "";
  const resolvedCategoryName = categoryName || categoryRow?.name || "";

  draft.aiMeta = {
    ...draft.aiMeta,
    qualityScore: {
      score: quality.score,
      passed: quality.passed,
      issues: quality.issues,
      suggestions: quality.suggestions,
      wordCount: quality.wordCount,
      improved,
    },
    buyerStage: buyerStage || draft.aiMeta?.buyerStage,
    searchIntent: searchIntent || draft.aiMeta?.searchIntent,
    trendType: trendType || draft.aiMeta?.trendType,
    regenerationCount: regenerationCount ?? draft.aiMeta?.regenerationCount ?? null,
    rejectedFromPostId: rejectedFromPostId || draft.aiMeta?.rejectedFromPostId || null,
    rejectedFromPostTitle: rejectedFromPostTitle || draft.aiMeta?.rejectedFromPostTitle || null,
    originalRejectedPostId:
      originalRejectedPostId || draft.aiMeta?.originalRejectedPostId || null,
  };

  const imageResult = await generateBlogFeaturedImage({
    featuredImagePrompt: draft.aiMeta?.featuredImagePrompt,
    title: draft.title,
    topic,
    categoryName: resolvedCategoryName,
    categorySlug: resolvedCategorySlug,
    slug: draft.slug,
  });

  if (imageResult?.url) {
    draft.featuredImage = imageResult.url;
    draft.aiMeta.featuredImageUrl = imageResult.url;
    draft.aiMeta.imageQualityScore = imageResult.imageQualityScore;
    draft.aiMeta.imageAttempts = imageResult.imageAttempts;
  }

  enrichDraftInternalLinks(draft, {
    categorySlug: resolvedCategorySlug,
    categoryName: resolvedCategoryName,
  });

  return { generationId, draft, quality };
}
