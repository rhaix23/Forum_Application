import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IQueryState } from "../../reducers/queryReducer";
import { RootState } from "../../store";
import { IUser } from "../../types/user.types";
import { api } from "../../utils/axios";

// @desc    Get all users
// @route   GET /api/admin/user
// @access  Private (Admin)
export const getUsers = createAsyncThunk<
  { users: IUser[] },
  IQueryState,
  { rejectValue: string }
>("users/getUsers", async (query, thunkAPI) => {
  let queries = "";
  if (query.searchBy && query.searchValue) {
    queries += `searchBy=${query.searchBy}&value=${query.searchValue}&`;
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
    const response = await api.get(`/admin/user?${queries}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Get single user
// @route   GET /api/user/:userId
// @access  Public
export const getSingleUser = createAsyncThunk<
  { user: IUser },
  { userId: string },
  { rejectValue: string }
>("users/getSingleUser", async ({ userId }, thunkAPI) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const login = createAsyncThunk<
  { user: IUser },
  { username: string; password: string },
  { rejectValue: string }
>("users/login", async (userInfo, thunkAPI) => {
  try {
    const response = await api.post("/user/login", userInfo);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
export const register = createAsyncThunk<
  { user: IUser },
  { username: string; password: string },
  { rejectValue: string }
>("users/register", async (userInfo, thunkAPI) => {
  try {
    const response = await api.post("/user/register", userInfo);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Refetch data for logged in user
// @route   GET /api/users/me
// @access  Private
export const getMe = createAsyncThunk<
  { user: IUser },
  void,
  { rejectValue: string }
>("users/getMe", async (_, thunkAPI) => {
  try {
    const response = await api.get("/user/me");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Logout user
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "users/logout",
  async (_, thunkAPI) => {
    try {
      const response = await api.post("/user/logout");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

// @desc    Change password
// @route   POST /api/users/changepassword
// @access  Private
export const changePassword = createAsyncThunk<
  void,
  { currentPassword: string; newPassword: string },
  { rejectValue: string }
>("users/changePassword", async (passwords, thunkAPI) => {
  try {
    const response = await api.post("/user/changepassword", passwords);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Update user
// @route   PATCH /api/user/:userId
// @access  Private
export const updateUser = createAsyncThunk<
  { user: IUser },
  { user: IUser },
  { rejectValue: string; state: RootState }
>("users/updateUser", async ({ user }, thunkAPI) => {
  try {
    const User = thunkAPI.getState().user.user;
    const url =
      User && User.role === "admin"
        ? `/admin/user/${user._id}`
        : `/user/${user._id}`;
    const response = await api.patch(url, {
      name: user.name,
      position: user.position,
      workingAt: user.workingAt,
      about: user.about,
      email: user.email,
      linkedin: user.linkedin,
      github: user.github,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Update user's account status
// @route   PATCH /api/admin/user/status/:userId
// @access  Private (Admin)
export const updateAccountStatus = createAsyncThunk<
  { user: IUser },
  { userId: string },
  { rejectValue: string }
>("users/updateAccountStatus", async ({ userId }, thunkAPI) => {
  try {
    const response = await api.patch(`/admin/user/status/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
