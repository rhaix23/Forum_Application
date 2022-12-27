import { SortOptions, TimeFilterOptions } from "../types/app.types";
import {
  IQueryOptionsAction,
  IQueryOptionsState,
  QueryOptionTypes,
} from "../types/post.types";

export const queryOptionsState: IQueryOptionsState = {
  sort: {
    text: "Newest",
    value: "-createdAt",
  },
  time: {
    text: "Today",
    value: "day",
  },
  activePage: 1,
};

export const queryOptionsReducer = (
  state: IQueryOptionsState,
  action: IQueryOptionsAction
) => {
  switch (action.type) {
    case QueryOptionTypes.SORT:
      return {
        ...state,
        sort: action.payload as { text: string; value: SortOptions },
      };
    case QueryOptionTypes.FILTERBYTIME:
      return {
        ...state,
        time: action.payload as { text: string; value: TimeFilterOptions },
      };
    case QueryOptionTypes.ACTIVEPAGE:
      return { ...state, activePage: action.payload as number };
    default:
      return state;
  }
};
