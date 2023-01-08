export interface ISort {
  text: "Newest" | "Oldest" | "Most Popular" | "Least Popular";
  value: "-createdAt" | "createdAt" | "-ratingCount" | "ratingCount";
}

export type SearchBy =
  | ""
  | "id"
  | "title"
  | "user"
  | "post"
  | "subcategory"
  | "username";

export enum QueryTypes {
  SEARCH_BY = "SEARCH_BY",
  SEARCH_VALUE = "SEARCH_VALUE",
  START_DATE = "START_DATE",
  END_DATE = "END_DATE",
  LIMIT = "LIMIT",
  SORT = "SORT",
  ACTIVE_PAGE = "ACTIVE_PAGE",
}

interface IQueryActions {
  type: QueryTypes;
  payload: string | Date | number | ISort;
}

export interface IQueryState {
  searchBy: SearchBy;
  searchValue: string;
  startDate: Date;
  endDate: Date;
  limit: number;
  activePage: number;
  sort: ISort;
}

export const queryState: IQueryState = {
  searchBy: "",
  searchValue: "",
  startDate: new Date(Date.now() - 7000 * 60 * 60 * 24),
  endDate: new Date(new Date().setHours(23, 59, 59, 999)),
  limit: 10,
  activePage: 1,
  sort: {
    text: "Newest",
    value: "-createdAt",
  },
};

export const queryReducer = (state: IQueryState, action: IQueryActions) => {
  switch (action.type) {
    case QueryTypes.SEARCH_BY:
      return {
        ...state,
        searchBy: action.payload as SearchBy,
      };
    case QueryTypes.SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload as string,
      };
    case QueryTypes.START_DATE:
      return {
        ...state,
        startDate: action.payload as Date,
      };
    case QueryTypes.END_DATE:
      return {
        ...state,
        endDate: action.payload as Date,
      };
    case QueryTypes.LIMIT:
      return {
        ...state,
        limit: action.payload as number,
      };
    case QueryTypes.ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload as number,
      };
    case QueryTypes.SORT:
      return {
        ...state,
        sort: action.payload as ISort,
      };
    default:
      return state;
  }
};
