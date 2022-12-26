export type UserRoles = "user" | "admin";

/* Interface that defines a user */
export interface IUser {
  _id: string;
  username: string;
  role: UserRoles;
  isDisabled: boolean;
  createdAt: Date;
}

/* Interface that defines a user's profile */
export interface IUserInformation extends IUser {
  name: string;
  about: string;
  position: string;
  workingAt: string;
  email: string;
  github: string;
  linkedin: string;
}
