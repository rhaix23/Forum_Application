export interface IUser {
  _id: string;
  username: string;
  role: "user" | "admin";
  name: string;
  position: string;
  workingAt: string;
  about: string;
  email: string;
  github: string;
  linkedin: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EditableUser = Omit<
  IUser,
  "_id" | "createdAt" | "updatedAt" | "username" | "role"
>;
