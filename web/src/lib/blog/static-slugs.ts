import { BLOG_ARTICLE_SLUGS } from "./article-slugs";
import { fetchPublishedCmsPosts } from "./cms";

/** Static blog slugs always available at build time. */
export function getStaticBlogSlugs(): readonly string[] {
  return BLOG_ARTICLE_SLUGS;
}

/** Static + CMS slugs for SSG param generation (CMS optional at build). */
export async function getAllBlogRouteSlugs(): Promise<string[]> {
  const slugs: string[] = [...BLOG_ARTICLE_SLUGS];
  const staticSet = new Set<string>(slugs);

  try {
    const cmsItems = await fetchPublishedCmsPosts();
    for (const post of cmsItems) {
      if (!staticSet.has(post.slug)) {
        staticSet.add(post.slug);
        slugs.push(post.slug);
      }
    }
  } catch {
    // CMS may be unavailable during build; static slugs still pre-render.
  }

  return slugs;
}
