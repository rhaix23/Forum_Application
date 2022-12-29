import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SortOptions, TimeFilterOptions } from "../../types/app.types";
import { IComment } from "../../types/comment.types";
import { api } from "../../utils/axios";

// @desc    Get all comments
export const getComments = createAsyncThunk<
  { comments: IComment[] },
  void,
  { rejectValue: string }
>("comment/getComments", async (_, thunkAPI) => {
  try {
    const response = await api.get(`/comment`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Get all comments for a post
export const getPostComments = createAsyncThunk<
  { comments: IComment[]; count: number; pages: number },
  { id: string; sort?: SortOptions; page?: number; limit?: number },
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
export const updateComment = createAsyncThunk<
  { comment: IComment },
  { commentId: string; body: string; postId: string },
  { rejectValue: string }
>("comment/updateComment", async ({ commentId, body, postId }, thunkAPI) => {
  try {
    const response = await api.patch(`/comment/${commentId}`, { body });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Delete a comment
export const deleteComment = createAsyncThunk<
  { id: string },
  { commentId: string },
  { rejectValue: string }
>("comment/deleteComment", async ({ commentId }, thunkAPI) => {
  try {
    const response = await api.delete(`/comment/${commentId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Get all comments for a user
export const getUserComments = createAsyncThunk<
  { comments: IComment[] },
  { userId: string },
  { rejectValue: string }
>("comment/getUserComments", async ({ userId }, thunkAPI) => {
  try {
    const response = await api.get(`/comment/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
