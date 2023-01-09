import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Status } from "../../types/app.types";
import { IReport } from "../../types/reports.types";
import {
  deleteReport,
  getReports,
  submitReport,
  updateReport,
} from "./reportThunks";

interface IReportState {
  reports: IReport[];
  status: Status;
  error: string;
  count: number;
  pages: number;
}

const initialState: IReportState = {
  reports: [],
  status: "idle",
  error: "",
  count: 0,
  pages: 0,
};

const ReportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReports.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getReports.fulfilled, (state, action) => {
      state.reports = action.payload.reports;
      state.count = action.payload.count;
      state.pages = action.payload.pages;
      state.status = "resolved";
    });
    builder.addCase(getReports.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(submitReport.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(submitReport.fulfilled, (state) => {
      toast.success("Report has been submitted");
      state.status = "resolved";
    });
    builder.addCase(submitReport.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(updateReport.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateReport.fulfilled, (state, action) => {
      state.reports = state.reports.map((report) => {
        if (report._id === action.payload.report._id) {
          return {
            ...report,
            status: action.payload.report.status,
          };
        }
        return report;
      });
      toast.success("Report has been updated");
      state.status = "resolved";
    });
    builder.addCase(updateReport.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(deleteReport.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteReport.fulfilled, (state, action) => {
      state.reports = state.reports.filter(
        (report) => report._id !== action.payload.id
      );
      toast.success("Report has been deleted");
      state.status = "resolved";
    });
    builder.addCase(deleteReport.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
      toast.error(action.payload);
    });
  },
});

export const {} = ReportSlice.actions;

export default ReportSlice.reducer;
