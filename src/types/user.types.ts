export type UserRoles = "user" | "admin";

export type UserId = string;

export interface IUserIdAndUsername {
  _id: UserId;
  username: string;
}

export interface IUser extends IUserIdAndUsername {
  role: UserRoles;
  isDisabled: boolean;
  createdAt: Date;
  name?: string;
  about?: string;
  position?: string;
  workingAt?: string;
  email?: string;
  github?: string;
  linkedin?: string;
}
