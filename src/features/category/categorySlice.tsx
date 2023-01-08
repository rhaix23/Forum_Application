import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/app.types";
import { ICategory } from "../../types/category.types";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./categoryThunks";

interface ICategorySliceState {
  categories: ICategory[];
  status: Status;
  error: string;
}

const initialState: ICategorySliceState = {
  categories: [],
  status: "idle",
  error: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.status = "resolved";
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });

    builder.addCase(createCategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload.category);
      state.status = "resolved";
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const updatedCategory = action.payload.category;
      state.categories = state.categories.map((category) => {
        if (category._id === updatedCategory._id) {
          return updatedCategory;
        }
        return category;
      });
      state.status = "resolved";
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload.id
      );
      state.status = "resolved";
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
