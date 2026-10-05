import { BlogDetailPage } from "@/views/blog-detail-page";

export default async function DetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogDetailPage id={id} />;
}
