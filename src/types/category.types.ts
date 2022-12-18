import { IPost } from "./post.types";

export interface ICategory {
  _id: string;
  name: string;
  subcategories: ISubcategory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubcategory {
  _id: string;
  name: string;
  description: string;
  category: ICategory;
  posts: IPost[];
}
