import { generateBlogDraft, improveBlogDraft } from "./blogAi.js";
import { checkBlogQuality, BLOG_QUALITY_PASS_SCORE } from "./blogQualityCheck.js";
import { generateBlogFeaturedImage } from "./blogImageAi.js";

/**
 * Full AI blog pipeline: generate → quality check → improve if needed → featured image.
 * Never publishes — caller saves as pending_review.
 */
export async function runBlogGenerationPipeline({
  topic,
  targetKeyword,
  categoryName,
  categoryId,
  tone = "professional",
  wordCount = 2000,
  createdBy = null,
  regenerationHint = null,
  buyerStage = null,
  searchIntent = null,
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
  };

  const featuredImage = await generateBlogFeaturedImage({
    featuredImagePrompt: draft.aiMeta?.featuredImagePrompt,
    title: draft.title,
    topic,
    categoryName,
    slug: draft.slug,
  });

  if (featuredImage) {
    draft.featuredImage = featuredImage;
    draft.aiMeta.featuredImageUrl = featuredImage;
  }

  return { generationId, draft, quality };
}
