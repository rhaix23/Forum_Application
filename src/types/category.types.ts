import { ISubcategoryNameAndDescription } from "./subcategory.types";

export type CategoryId = string;

export interface ICategoryIdAndName {
  _id: CategoryId;
  name: string;
}

export interface ICategory extends ICategoryIdAndName {
  subcategories: ISubcategoryNameAndDescription[];
}
