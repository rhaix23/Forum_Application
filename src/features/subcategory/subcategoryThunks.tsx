import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IPopulatedSubcategory } from "../../types/subcategory.types";
import { api } from "../../utils/axios";

// @desc    Get all subcategories
// @route   GET /admin/subcategory
// @access  Private (Admin)
export const getSubcategories = createAsyncThunk<
  { subcategories: IPopulatedSubcategory[] },
  void,
  { rejectValue: string }
>("subcategory/getSubcategory", async (_, thunkAPI) => {
  try {
    const response = await api.get("/admin/subcategory");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc   Create a subcategory
// @route  POST /admin/subcategory
// @access Private (Admin)
export const createSubcategory = createAsyncThunk<
  { subcategory: IPopulatedSubcategory },
  { name: string; description: string; categoryId: string },
  { rejectValue: string }
>("subcategory/createSubcategory", async (newSubcategoryDetails, thunkAPI) => {
  try {
    const response = (await api.post(
      "/admin/subcategory",
      newSubcategoryDetails
    )) as { data: { subcategory: IPopulatedSubcategory } };
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

// @desc   Update a subcategory
// @route  PATCH /admin/subcategory/:id
// @access Private (Admin)
export const updateSubcategory = createAsyncThunk<
  { subcategory: IPopulatedSubcategory },
  {
    subcategoryId: string;
    name: string;
    description: string;
    categoryId: string;
    allowUsersToPost: boolean;
  },
  { rejectValue: string }
>(
  "subcategory/updateSubcategory",
  async (updatedSubcategoryDetails, thunkAPI) => {
    try {
      const response = await api.patch(
        `/admin/subcategory/${updatedSubcategoryDetails.subcategoryId}`,
        updatedSubcategoryDetails
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

// @desc   Delete a subcategory
// @route  DELETE /admin/subcategory/:id
// @access Private (Admin)
export const deleteSubcategory = createAsyncThunk<
  { id: string },
  { subcategoryId: string },
  { rejectValue: string }
>("subcategory/deleteSubcategory", async ({ subcategoryId }, thunkAPI) => {
  try {
    const response = await api.delete(`/admin/subcategory/${subcategoryId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});
