export type IRatingId = string;

export interface IRating {
  _id: string;
  post: string;
  user: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}
