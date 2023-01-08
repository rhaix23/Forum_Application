import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { IQueryState, ISort } from "../../reducers/adminPostsQueryReducer";
import { RootState } from "../../store";
import { TimeFilterOptions, SortOptions } from "../../types/app.types";
import { IAdminPagePost, IPost } from "../../types/post.types";
import { api } from "../../utils/axios";

// @desc    Get all posts
// @route   GET /api/admin/post
// @access  Private (Admin)
export const getPosts = createAsyncThunk<
  { posts: IAdminPagePost[]; count: number; pages: number },
  {
    activePage: number;
    searchValue: string;
    limit: number;
    startDate: Date;
    endDate: Date;
    sort: ISort;
    searchBy: string;
  },
  { rejectValue: string }
>("post/getPosts", async (query, thunkAPI) => {
  const value = query.searchValue.toLowerCase();
  const startDate = dayjs(query.startDate).startOf("day");
  const endDate = dayjs(query.endDate);
  let url = "";
  if (query.searchBy) {
    url += `searchBy=${query.searchBy}&`;
  }
  if (value) {
    url += `value=${value}&`;
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
    const response = await api.get(`/admin/post?${url}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Get posts for a subcategory
// @route   GET /api/post/subcategory/:id
// @access  Public
export const getSubcategoryPosts = createAsyncThunk<
  { posts: IPost[]; count: number; pages: number },
  { id: string; query: IQueryState },
  { rejectValue: string }
>("post/getSubcategoryPosts", async ({ id, query }, thunkAPI) => {
  const value = query.searchValue.toLowerCase();
  const startDate = dayjs(query.startDate).startOf("day");
  const endDate = dayjs(query.endDate);
  let queries = "";
  if (query.searchBy) {
    queries += `searchBy=${query.searchBy}&`;
  }
  if (value) {
    queries += `value=${value}&`;
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
    queries += `sort=${query.sort.value}`;
  }
  try {
    const response = await api.get(`/post/subcategory/${id}?${queries}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Get a single post
// @route   GET /api/post/:id
// @access  Public
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
// @route   POST /api/post
// @access  Private
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
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Edit a post
// @route   PATCH /api/post/:id
// @access  Private
export const editPost = createAsyncThunk<
  { post: IPost },
  {
    id: string;
    title: string;
    body: string;
    subcategoryId: string;
    isLocked: boolean;
  },
  { rejectValue: string; state: RootState }
>("post/editPost", async (post, thunkAPI) => {
  try {
    const user = thunkAPI.getState().user.user;
    const url =
      user && user.role === "admin"
        ? `/admin/post/${post.id}`
        : `/post/${post.id}`;
    const response = await api.patch(url, post);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Delete a post from the database
// @route   DELETE /api/post/:id
// @access  Private (Admin)
export const deletePost = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string; state: RootState }
>("post/deletePost", async ({ id }, thunkAPI) => {
  try {
    const response = await api.delete(`/admin/post/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Remove a post
// @route   PATCH /api/post/remove/:id
// @access  Private
export const removePost = createAsyncThunk<
  { post: IPost },
  { id: string },
  { rejectValue: string; state: RootState }
>("post/removePost", async ({ id }, thunkAPI) => {
  try {
    const user = thunkAPI.getState().user.user;
    const url =
      user && user.role === "admin"
        ? `/admin/post/remove/${id}`
        : `/post/remove/${id}`;
    const response = await api.patch(url);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    rate a post
// @route   POST /api/rating
// @access  Private
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
// @route PATCH /api/rating/:id
// @access Private
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
// @route   DELETE /api/rating/:id
// @access  Private
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
// @route   GET /api/post/user/:id
// @access  Public
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
