export interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  description: string;
}

export interface CreateBlogInput {
  title: string;
  excerpt: string;
  description: string;
}

export type UpdateBlogInput = CreateBlogInput;
