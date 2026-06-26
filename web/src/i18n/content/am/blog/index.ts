import type { BlogTexts } from "@/lib/i18n/content/types";
import type { BlogArticleSlug } from "@/lib/blog/article-slugs";
import batchA from "./batch-a.json";
import batchB from "./batch-b.json";
import batchC from "./batch-c.json";
import batchD from "./batch-d.json";

const batches = [batchA, batchB, batchC, batchD] as Partial<
  Record<BlogArticleSlug, BlogTexts>
>[];

export const blog: Partial<Record<BlogArticleSlug, BlogTexts>> = Object.assign(
  {},
  ...batches
);
