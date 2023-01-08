import { CategoryId, ICategoryIdAndName } from "./category.types";

export type SubcategoryId = string;

export interface ISubcategory {
  _id: SubcategoryId;
  name: string;
  description: string;
  allowUsersToPost: boolean;
  category: CategoryId;
}

export interface IPopulatedSubcategory extends Omit<ISubcategory, "category"> {
  category: ICategoryIdAndName;
}

export type ISubcategoryNameAndDescription = Omit<
  ISubcategory,
  "allowUsersToPost" | "category"
>;
