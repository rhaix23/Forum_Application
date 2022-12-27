export type UserRoles = "user" | "admin";

export interface IUserIdAndUsername {
  _id: string;
  username: string;
}

/* Interface that defines a user */
export interface IUser {
  _id: string;
  username: string;
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
