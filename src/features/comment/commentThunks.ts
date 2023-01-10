import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { IQueryState } from "../../reducers/queryReducer";
import { RootState } from "../../store";
import { SortOptions, TimeFilterOptions } from "../../types/app.types";
import { IComment } from "../../types/comment.types";
import { api } from "../../utils/axios";

// @desc    Get all comments
// @route   GET /admin/comment
// @access  Private (Admin)
export const getComments = createAsyncThunk<
  { comments: IComment[]; count: number; pages: number },
  IQueryState,
  { rejectValue: string }
>("comment/admin/getComments", async (query, thunkAPI) => {
  const startDate = dayjs(query.startDate).startOf("day");
  const endDate = dayjs(query.endDate);
  let url = "";
  if (query.searchBy && query.searchValue) {
    url += `searchBy=${query.searchBy}&value=${query.searchValue}&`;
  }
  if (startDate && endDate) {
    url += `start=${startDate}&end=${endDate}&`;
  }
  if (query.activePage) {
    url += `page=${query.activePage}&`;
  }
  if (query.limit) {
    url += `limit=${query.limit}&`;
  }
  if (query.sort) {
    url += `sort=${query.sort.value}`;
  }
  try {
    const response = await api.get(`/admin/comment?${url}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Get all comments for a post
// @route   GET /comment/post/:id
// @access  Public
export const getPostComments = createAsyncThunk<
  { comments: IComment[]; count: number; pages: number },
  { id: string; sort?: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  "comment/getPostComments",
  async ({ id, sort = "-createdAt", page = 1, limit = 20 }, thunkAPI) => {
    try {
      const response = await api.get(
        `/comment/post/${id}?sort=${sort}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

// @desc    Create a comment
// @route   POST /comment
// @access  Private
export const createComment = createAsyncThunk<
  { comment: IComment },
  { body: string; postId: string },
  { rejectValue: string }
>("comment/createComment", async (comment, thunkAPI) => {
  try {
    const response = await api.post(`/comment`, comment);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Update a comment
// @route   PATCH /comment/:id
// @access  Private
export const updateComment = createAsyncThunk<
  { comment: IComment },
  { commentId: string; body: string; postId: string },
  { rejectValue: string; state: RootState }
>("comment/updateComment", async ({ commentId, body, postId }, thunkAPI) => {
  try {
    const user = thunkAPI.getState().user.user;
    const url =
      user && user.role === "admin"
        ? `/admin/comment/${commentId}`
        : `/comment/${commentId}`;
    const response = await api.patch(url, { body });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Delete a comment
// @route   DELETE /comment/:id
// @access  Private
export const deleteComment = createAsyncThunk<
  { id: string },
  { commentId: string },
  { rejectValue: string; state: RootState }
>("comment/deleteComment", async ({ commentId }, thunkAPI) => {
  try {
    const user = thunkAPI.getState().user.user;
    const url =
      user && user.role === "admin"
        ? `/admin/comment/${commentId}`
        : `/comment/${commentId}`;
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Get all comments by a user
// @route   GET /comment/user/:id
// @access  Public
export const getUserComments = createAsyncThunk<
  { comments: IComment[]; count: number; pages: number },
  { userId: string; query: IQueryState },
  { rejectValue: string }
>("comment/getUserComments", async ({ userId, query }, thunkAPI) => {
  let queries = "";
  if (query.activePage) {
    queries += `page=${query.activePage}`;
  }
  try {
    const response = await api.get(`/comment/user/${userId}?${queries}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
