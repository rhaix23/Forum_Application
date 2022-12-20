import { ISubcategoryIdAndName } from "./category.types";
import { IComment, ICommentId } from "./comment.types";
import { IRating, IRatingId } from "./rating.types";
import { IUser, IUserIdAndUsername } from "./user.types";

export interface IPost {
  _id: string;
  title: string;
  body: string;
  user: IUser;
  subcategory: ISubcategoryIdAndName;
  comments: IComment[];
  likes: IRating[];
  dislikes: IRating[];
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface INewPost {
  title: string;
  body: string;
  subcategoryId: string;
}
