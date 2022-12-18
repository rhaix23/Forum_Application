import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { EditableUser, IUser } from "../../types/user.types";
import { api } from "../../utils/axios";

// @desc    Get single user
export const getSingleUser = createAsyncThunk<
  { user: IUser },
  { userId: string },
  { rejectValue: string }
>("users/getSingleUser", async ({ userId }, thunkAPI) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Login user
export const login = createAsyncThunk<
  { user: IUser },
  { username: string; password: string },
  { rejectValue: string }
>("users/login", async (userInfo, thunkAPI) => {
  try {
    const response = await api.post("/users/login", userInfo);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Register user
export const register = createAsyncThunk<
  { user: IUser },
  { username: string; password: string },
  { rejectValue: string }
>("users/register", async (userInfo, thunkAPI) => {
  try {
    const response = await api.post("/users/register", userInfo);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Refetch data for logged in user
export const getMe = createAsyncThunk<
  { user: IUser },
  void,
  { rejectValue: string }
>("users/getMe", async (_, thunkAPI) => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Logout user
export const logout = createAsyncThunk<void, void>("users/logout", async () => {
  const response = await api.post("/users/logout");
  return response.data;
});

// @desc    Change password
export const changePassword = createAsyncThunk<
  void,
  { currentPassword: string; newPassword: string },
  { rejectValue: string }
>("users/changePassword", async (passwords, thunkAPI) => {
  try {
    const response = await api.post("/users/changepassword", passwords);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc    Update user
export const updateUser = createAsyncThunk<
  { user: IUser },
  { userId: string; userInfo: EditableUser },
  { rejectValue: string }
>("users/updateUser", async ({ userId, userInfo }, thunkAPI) => {
  try {
    const response = await api.patch(`/users/${userId}`, userInfo);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
