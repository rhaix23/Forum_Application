import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { KnownError } from "../../types/app.types";
import { ICategory } from "../../types/category.types";
import { api } from "../../utils/axios";

// @desc    Fetch all categories
export const fetchCategories = createAsyncThunk<
  { categories: ICategory[] },
  void,
  { rejectValue: string }
>("category/fetchCategories", async (_, thunkAPI) => {
  try {
    const response = await api.get("/category");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
