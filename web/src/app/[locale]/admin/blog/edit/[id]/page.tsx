import { AdminBlogEditor } from "@/components/admin/blog/AdminBlogEditor";

type Props = { params: Promise<{ id: string }> };

export default async function AdminBlogEditPage({ params }: Props) {
  const { id } = await params;
  return <AdminBlogEditor postId={id} />;
}
