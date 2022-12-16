import { IComment } from "./comment.types";
import { IRating } from "./rating.types";
import { IUser } from "./user.types";

export interface IPost {
  _id: string;
  title: string;
  body: string;
  user: IUser;
  subcategory: string;
  comments: IComment[];
  likes: IRating[];
  dislikes: IRating[];
}

export interface INewPost {
  title: string;
  body: string;
  subcategoryId: string;
}
