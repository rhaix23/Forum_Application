import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { KnownError } from "../../types/app.types";
import { IPost } from "../../types/post.types";
import { api } from "../../utils/axios";

// @desc    Get posts for a subcategory
export const getSubcategoryPosts = createAsyncThunk<
  { posts: IPost[] },
  { id: string },
  { rejectValue: string }
>("post/getSubcategoryPosts", async ({ id }, thunkAPI) => {
  try {
    const response = await api.get(`/post/subcategory/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Get a single post
export const getSinglePost = createAsyncThunk<
  { post: IPost },
  { id: string },
  { rejectValue: string }
>("post/getSinglePost", async ({ id }, thunkAPI) => {
  try {
    const response = await api.get(`/post/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Create a post
export const createPost = createAsyncThunk<
  { post: IPost },
  {
    title: string;
    body: string;
    subcategoryId: string;
  },
  { rejectValue: string }
>("post/createPost", async (post, thunkAPI) => {
  try {
    const response = await api.post(`/post`, post);
    thunkAPI.dispatch(getSubcategoryPosts({ id: post.subcategoryId }));
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Edit a post
export const editPost = createAsyncThunk<
  { post: IPost },
  {
    id: string;
    title: string;
    body: string;
  },
  { rejectValue: string }
>("post/editPost", async (post, thunkAPI) => {
  try {
    const response = await api.patch(`/post/${post.id}`, post);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Delete a post
export const deletePost = createAsyncThunk<
  void,
  { id: string },
  { rejectValue: string }
>("post/deletePost", async ({ id }, thunkAPI) => {
  try {
    const response = await api.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    rate a post
export const ratePost = createAsyncThunk<
  void,
  { value: -1 | 1; postId: string },
  { rejectValue: string }
>("post/ratePost", async (rating, thunkAPI) => {
  try {
    const response = await api.post(`/rating`, rating);
    thunkAPI.dispatch(getSinglePost({ id: rating.postId }));
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc update post rating
export const updatePostRate = createAsyncThunk<
  void,
  { value: -1 | 1; id: string; postId: string },
  { rejectValue: string }
>("post/updatePostRate", async ({ value, id, postId }, thunkAPI) => {
  try {
    const response = await api.patch(`/rating/${id}`, { value });
    thunkAPI.dispatch(getSinglePost({ id: postId }));
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    delete post rating
export const deletePostRate = createAsyncThunk<
  void,
  { id: string; postId: string },
  { rejectValue: string }
>("post/deletePostRate", async ({ id, postId }, thunkAPI) => {
  try {
    const response = await api.delete(`/rating/${id}`);
    thunkAPI.dispatch(getSinglePost({ id: postId }));
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Get all user posts
export const getUserPosts = createAsyncThunk<
  { posts: IPost[] },
  { userId: string },
  { rejectValue: string }
>("post/getUserPosts", async ({ userId }, thunkAPI) => {
  try {
    const response = await api.get(`/post/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
