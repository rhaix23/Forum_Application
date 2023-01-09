import { IUserIdAndUsername } from "./user.types";

export interface IReport {
  _id: string;
  user: IUserIdAndUsername;
  description: string;
  reason: string;
  status: ReportStatus;
  reportedObjectType: ReportType;
  reportedObjectId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubmitReportReq {
  user: string;
  reason: string;
  description: string;
  reportedObjectType: ReportType;
  reportedObjectId: string;
}

export type ReportStatus = "" | "pending" | "resolved" | "closed";

export type ReportType = "" | "User" | "Post" | "Comment";
