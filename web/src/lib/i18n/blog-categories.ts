import { blogCategories as baseBlogCategories } from "@/lib/blog/categories";
import type { BlogCategory } from "@/lib/blog/types";
import type { Locale } from "@/i18n/routing";
import { getMessages, getNested } from "./locale-messages";

export async function getLocalizedBlogCategories(locale: Locale): Promise<BlogCategory[]> {
  const messages = await getMessages(locale);

  return baseBlogCategories.map((cat) => ({
    ...cat,
    name:
      getNested(messages, `blogUi.categories.${cat.slug}.name`) ?? cat.name,
    description:
      getNested(messages, `blogUi.categories.${cat.slug}.description`) ??
      cat.description,
  }));
}

export async function getLocalizedBlogCategory(
  slug: string,
  locale: Locale
): Promise<BlogCategory | undefined> {
  const categories = await getLocalizedBlogCategories(locale);
  return categories.find((c) => c.slug === slug);
}
