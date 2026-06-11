import { AdminBlogPostAnalytics } from "@/components/admin/blog/AdminBlogPostAnalytics";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminBlogPostAnalyticsPage({ params }: Props) {
  const { id } = await params;
  return <AdminBlogPostAnalytics postId={id} />;
}
