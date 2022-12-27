import { SortOptions, TimeFilterOptions } from "./app.types";
import { IRating } from "./rating.types";

export interface IPostIdAndTitle {
  _id: string;
  title: string;
}

/* Defines the type of the Post object */
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

/* Defines the type of the useReducer state
 * in the Posts page */
export interface IQueryOptionsState {
  sort: { text: string; value: SortOptions };
  time: { text: string; value: TimeFilterOptions };
  activePage: number;
}

/* Defines the type of the useReducer action types */
export enum QueryOptionTypes {
  SORT = "SORT",
  FILTERBYTIME = "FILTERBYTIME",
  ACTIVEPAGE = "ACTIVEPAGE",
}

/* Defines the type of the useReducer action */
export interface IQueryOptionsAction {
  type: QueryOptionTypes;
  payload:
    | { text: string; value: SortOptions }
    | { text: string; value: TimeFilterOptions }
    | number;
}
