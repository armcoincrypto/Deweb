"use client";

import { PinnedBlogExperience } from "@/components/cinematic/PinnedBlogExperience";
import type { BlogArticle } from "@/lib/blog/types";

type HomeBlogProps = {
  articles: BlogArticle[];
};

export function HomeBlog({ articles }: HomeBlogProps) {
  return <PinnedBlogExperience articles={articles} />;
}
