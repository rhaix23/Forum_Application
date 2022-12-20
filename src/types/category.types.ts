import { IPost } from "./post.types";

export interface ICategory {
  _id: string;
  name: string;
  subcategories: ISubcategory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubcategoryIdAndName {
  _id: string;
  name: string;
}

export interface ISubcategory extends ISubcategoryIdAndName {
  description: string;
  category: ICategory;
}
