import { SortOptions, TimeFilterOptions } from "./app.types";
import { IRating } from "./rating.types";

export interface IPostIdAndTitle {
  _id: string;
  title: string;
}

export interface IPost {
  _id: string;
  title: string;
  body: string;
  user: {
    _id: string;
    username: string;
  };
  subcategory: { _id: string; name: string };
  comments: string[];
  likes: IRating[];
  dislikes: IRating[];
  isLocked: boolean;
  isRemoved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminPagePost {
  _id: string;
  title: string;
  body: string;
  isLocked: boolean;
  user: {
    _id: string;
    username: string;
  };
  subcategory: {
    _id: string;
    name: string;
  };
}

export interface IQueryOptionsState {
  sort: { text: string; value: SortOptions };
  time: { text: string; value: TimeFilterOptions };
  search: string;
  activePage: number;
}

export enum QueryOptionTypes {
  SORT = "SORT",
  FILTERBYTIME = "FILTERBYTIME",
  ACTIVEPAGE = "ACTIVEPAGE",
  SEARCH = "SEARCH",
}

export interface IQueryOptionsAction {
  type: QueryOptionTypes;
  payload:
    | { text: string; value: SortOptions }
    | { text: string; value: TimeFilterOptions }
    | string
    | number;
}
