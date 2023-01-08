import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ICategory } from "../../types/category.types";
import { api } from "../../utils/axios";

// @desc    Fetch all categories
// @route   GET /api//admin/category
// @access  Public
export const getCategories = createAsyncThunk<
  { categories: ICategory[] },
  void,
  { rejectValue: string }
>("category/getCategories", async (_, thunkAPI) => {
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

// @desc   Create a category
// @route  POST /api/admin/category
// @access Private (Admin)
export const createCategory = createAsyncThunk<
  { category: ICategory },
  { name: string },
  { rejectValue: string }
>("category/createCategory", async ({ name }, thunkAPI) => {
  try {
    const response = await api.post("/admin/category", { name });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc   Update a category
// @route  PATCH /api/admin/category/:id
// @access Private (Admin)
export const updateCategory = createAsyncThunk<
  { category: ICategory },
  { categoryId: string; name: string },
  { rejectValue: string }
>("category/updateCategory", async ({ categoryId, name }, thunkAPI) => {
  try {
    const response = await api.patch(`/admin/category/${categoryId}`, { name });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc   Delete a category
// @route  DELETE /api/admin/category/:id
// @access Private (Admin)
export const deleteCategory = createAsyncThunk<
  { id: string },
  { categoryId: string },
  { rejectValue: string }
>("category/deleteCategory", async ({ categoryId }, thunkAPI) => {
  try {
    const response = await api.delete(`/admin/category/${categoryId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
