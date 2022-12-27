import { IPostIdAndTitle } from "./post.types";
import { IUserIdAndUsername } from "./user.types";

export interface IComment {
  _id: string;
  body: string;
  post: IPostIdAndTitle;
  user: IUserIdAndUsername;
  createdAt: string;
  updatedAt: string;
}
