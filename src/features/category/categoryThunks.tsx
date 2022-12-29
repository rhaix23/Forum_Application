import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ICategory } from "../../types/category.types";
import { ISubcategory } from "../../types/subcategory.types";
import { api } from "../../utils/axios";

// @desc    Fetch all categories
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

// @desc    Fetch all subcategories
export const getSubcategories = createAsyncThunk<
  { subcategories: ISubcategory[] },
  void,
  { rejectValue: string }
>("category/getSubcategory", async (_, thunkAPI) => {
  try {
    const response = await api.get("/subcategory");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc   Create a category
export const createCategory = createAsyncThunk<
  void,
  { name: string },
  { rejectValue: string }
>("category/createCategory", async ({ name }, thunkAPI) => {
  try {
    const response = await api.post("/category", { name });
    thunkAPI.dispatch(getCategories());
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc   Update a category
export const updateCategory = createAsyncThunk<
  { category: ICategory },
  { categoryId: string; name: string },
  { rejectValue: string }
>("category/updateCategory", async ({ categoryId, name }, thunkAPI) => {
  try {
    const response = await api.patch(`/category/${categoryId}`, { name });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc   Delete a category
export const deleteCategory = createAsyncThunk<
  { id: string },
  { categoryId: string },
  { rejectValue: string }
>("category/deleteCategory", async ({ categoryId }, thunkAPI) => {
  try {
    const response = await api.delete(`/category/${categoryId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc   Create a subcategory
export const createSubcategory = createAsyncThunk<
  void,
  { name: string; description: string; categoryId: string },
  { rejectValue: string }
>("category/createSubcategory", async (newSubcategoryDetails, thunkAPI) => {
  try {
    const response = await api.post("/subcategory", newSubcategoryDetails);
    thunkAPI.dispatch(getSubcategories());
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc   Update a subcategory
export const updateSubcategory = createAsyncThunk<
  { subcategory: ISubcategory },
  {
    subcategoryId: string;
    name: string;
    description: string;
    categoryId: string;
    allowUsersToPost: boolean;
  },
  { rejectValue: string }
>("category/updateSubcategory", async (updatedSubcategoryDetails, thunkAPI) => {
  try {
    const response = await api.patch(
      `/subcategory/${updatedSubcategoryDetails.subcategoryId}`,
      updatedSubcategoryDetails
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc   Delete a subcategory
export const deleteSubcategory = createAsyncThunk<
  { id: string },
  { subcategoryId: string },
  { rejectValue: string }
>("category/deleteSubcategory", async ({ subcategoryId }, thunkAPI) => {
  try {
    const response = await api.delete(`/subcategory/${subcategoryId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
