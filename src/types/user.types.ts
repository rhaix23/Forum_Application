export interface IUser {
  _id: string;
  username: string;
  role?: "user" | "admin";
  about?: string;
  email?: string;
  github?: string;
  linkedin?: string;
}

export interface IUser {
  _id: string;
}
