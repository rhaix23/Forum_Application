export interface IUserIdAndUsername {
  _id: string;
  username: string;
}

export interface IUser extends IUserIdAndUsername {
  role: "user" | "admin";
  name: string;
  position: string;
  workingAt: string;
  about: string;
  email: string;
  github: string;
  linkedin: string;
  isDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type EditableUser = Omit<
  IUser,
  "_id" | "createdAt" | "updatedAt" | "username" | "role"
>;
