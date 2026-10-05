import { apiClient } from "@/shared/lib/api-client";
import type { Blog, CreateBlogInput, UpdateBlogInput } from "./types";

export async function listPosts(): Promise<Blog[]> {
  const { data } = await apiClient.get<Blog[]>("/blog");
  return Array.isArray(data) ? data : [];
}

export async function getPost(id: string): Promise<Blog | null> {
  const { data } = await apiClient.get<Blog | null>(`/blog/${id}`);
  return data ?? null;
}

export async function createPost(input: CreateBlogInput): Promise<Blog> {
  const { data } = await apiClient.post<Blog>("/blog", input);
  return data;
}

export async function updatePost(
  id: string,
  input: UpdateBlogInput,
): Promise<Blog> {
  const { data } = await apiClient.patch<Blog>(`/blog/${id}`, input);
  return data;
}

export async function deletePost(id: string): Promise<void> {
  await apiClient.delete(`/blog/${id}`);
}
