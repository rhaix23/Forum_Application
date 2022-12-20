import { IPost } from "./post.types";
import { IUser } from "./user.types";

export type ICommentId = string;

export interface IComment {
  _id: string;
  body: string;
  post: IPost;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
