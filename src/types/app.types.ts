export type Status = "idle" | "pending" | "resolved" | "rejected";

export interface CustomError {
  msg: string;
}

export type KnownError = CustomError | string;
