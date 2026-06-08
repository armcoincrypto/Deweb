import { AdminBlogPreview } from "@/components/admin/blog/AdminBlogPreview";

type Props = { params: Promise<{ id: string }> };

export default async function AdminBlogPreviewPage({ params }: Props) {
  const { id } = await params;
  return <AdminBlogPreview postId={id} />;
}
