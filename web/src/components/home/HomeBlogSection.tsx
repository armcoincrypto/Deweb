import { getAllArticlesMerged } from "@/lib/blog/server";
import { HomeBlog } from "./HomeBlog";

export async function HomeBlogSection() {
  const articles = (await getAllArticlesMerged()).slice(0, 4);
  return <HomeBlog articles={articles} />;
}
