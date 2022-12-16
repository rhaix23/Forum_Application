import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IComment } from "../../types/comment.types";
import { api } from "../../utils/axios";

// @desc    Get all comments for a post
export const getPostComments = createAsyncThunk<
  { comments: IComment[] },
  { id: string },
  { rejectValue: string }
>("comment/getPostComments", async ({ id }, thunkAPI) => {
  try {
    const response = await api.get(`/comment/post/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Create a comment
export const createComment = createAsyncThunk<
  { comments: IComment[] },
  { body: string; postId: string },
  { rejectValue: string }
>("comment/createComment", async (comment, thunkAPI) => {
  try {
    const response = await api.post(`/comment`, comment);
    thunkAPI.dispatch(getPostComments({ id: comment.postId }));
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
    thunkAPI.dispatch(getPostComments({ id: postId }));
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
  void,
  { commentId: string; postId: string },
  { rejectValue: string }
>("comment/deleteComment", async ({ commentId, postId }, thunkAPI) => {
  try {
    const response = await api.delete(`/comment/${commentId}`);
    thunkAPI.dispatch(getPostComments({ id: postId }));
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

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
