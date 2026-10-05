import { BlogEditPage } from "@/views/blog-edit-page";

export default async function EditRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogEditPage id={id} />;
}
