import { IPost } from "./post.types";
import { IUser } from "./user.types";

export interface IRating {
  _id: string;
  post: string;
  user: string;
  value: number;
}
