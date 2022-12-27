export type Status = "idle" | "pending" | "resolved" | "rejected";

export interface CustomError {
  msg: string;
}

export type KnownError = CustomError | string;

export type SortOptions =
  | "-createdAt"
  | "+createdAt"
  | "-ratingCount"
  | "+ratingCount";

export type TimeFilterOptions = "day" | "week" | "month" | "year" | "all";
