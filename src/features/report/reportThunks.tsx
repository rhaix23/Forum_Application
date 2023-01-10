import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { IQueryState } from "../../reducers/adminPostsQueryReducer";
import {
  IReport,
  ISubmitReportReq,
  ReportStatus,
} from "../../types/reports.types";
import { api } from "../../utils/axios";

// @desc    Get all reports
// @route   GET /report
// @access  Private (Admin)
export const getReports = createAsyncThunk<
  { reports: IReport[]; count: number; pages: number },
  IQueryState,
  { rejectValue: string }
>("report/admin/getReports", async (query, thunkAPI) => {
  const startDate = dayjs(query.startDate).startOf("day");
  const endDate = dayjs(query.endDate);
  let queries = "";
  if (query.searchBy && query.searchValue) {
    queries += `searchBy=${query.searchBy}&value=${query.searchValue}&`;
  }
  if (startDate && endDate) {
    queries += `start=${startDate}&end=${endDate}&`;
  }
  if (query.activePage) {
    queries += `page=${query.activePage}&`;
  }
  if (query.limit) {
    queries += `limit=${query.limit}&`;
  }
  if (query.sort) {
    queries += `sort=${query.sort.value}&`;
  }
  if (query.reportType) {
    queries += `reportType=${query.reportType}&`;
  }
  if (query.status) {
    queries += `reportStatus=${query.status.toLowerCase()}`;
  }
  try {
    const response = await api.get(`/admin/report?${queries}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Submit a report
// @route   POST /report
// @access  Private
export const submitReport = createAsyncThunk<
  void,
  ISubmitReportReq,
  { rejectValue: string }
>("report/submitReport", async (reportDetails, thunkAPI) => {
  try {
    const response = await api.post("/report", { ...reportDetails });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

export const updateReport = createAsyncThunk<
  { report: IReport },
  { reportId: string; status: ReportStatus },
  { rejectValue: string }
>("report/admin/updateReport", async ({ reportId, status }, thunkAPI) => {
  try {
    const response = await api.patch(`/admin/report/${reportId}`, { status });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

export const deleteReport = createAsyncThunk<
  { id: string },
  { reportId: string },
  { rejectValue: string }
>("report/admin/deleteReport", async ({ reportId }, thunkAPI) => {
  try {
    const response = await api.delete(`/admin/report/${reportId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
