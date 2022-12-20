import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/app.types";
import { ICategory, ISubcategory } from "../../types/category.types";
import {
  createCategory,
  createSubcategory,
  deleteCategory,
  deleteSubcategory,
  getCategories,
  getSubcategories,
  updateCategory,
  updateSubcategory,
} from "./categoryThunks";

interface ICategorySliceState {
  categories: ICategory[];
  subcategories: ISubcategory[];
  status: Status;
  error: string;
}

const initialState: ICategorySliceState = {
  categories: [],
  subcategories: [],
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
    builder.addCase(getSubcategories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getSubcategories.fulfilled, (state, action) => {
      state.subcategories = action.payload.subcategories;
      state.status = "resolved";
    });
    builder.addCase(getSubcategories.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(createCategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
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
    builder.addCase(createSubcategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createSubcategory.fulfilled, (state) => {
      state.status = "resolved";
    });
    builder.addCase(createSubcategory.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(updateSubcategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateSubcategory.fulfilled, (state, action) => {
      const updatedSubcategory = action.payload.subcategory;
      state.subcategories = state.subcategories.map((subcategory) => {
        if (subcategory._id === updatedSubcategory._id) {
          return updatedSubcategory;
        }
        return subcategory;
      });
      state.status = "resolved";
    });
    builder.addCase(updateSubcategory.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(deleteSubcategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteSubcategory.fulfilled, (state, action) => {
      state.subcategories = state.subcategories.filter(
        (subcategory) => subcategory._id !== action.payload.id
      );
      state.status = "resolved";
    });
    builder.addCase(deleteSubcategory.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
