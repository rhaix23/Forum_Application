export interface ICategory {
  _id: string;
  name: string;
  subcategories: {
    _id: string;
    name: string;
    description: string;
  }[];
}

export interface ISubcategory {
  _id: string;
  name: string;
  description: string;
  allowUsersToPost: boolean;
  category: {
    _id: string;
    name: string;
  };
}

export interface ISubcategoryIdAndName {
  _id: string;
  name: string;
}
