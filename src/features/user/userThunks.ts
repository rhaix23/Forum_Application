import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { KnownError } from "../../types/app.types";
import { IUser } from "../../types/user.types";
import { api } from "../../utils/axios";

// @desc    Login user
export const login = createAsyncThunk<
  { user: IUser },
  { username: string; password: string },
  { rejectValue: KnownError }
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

// @desc    Refetch data for logged in user
export const getMe = createAsyncThunk<
  { user: IUser },
  void,
  { rejectValue: KnownError }
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
  const response = await api.get("/users/logout");
  return response.data;
});
