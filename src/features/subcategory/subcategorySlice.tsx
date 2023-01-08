import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Status } from "../../types/app.types";
import { IPopulatedSubcategory } from "../../types/subcategory.types";
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  updateSubcategory,
} from "./subcategoryThunks";

interface ISubcategoryState {
  subcategories: IPopulatedSubcategory[];
  status: Status;
  error: string;
}

const initialState: ISubcategoryState = {
  subcategories: [],
  status: "idle",
  error: "",
};

const SubcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubcategories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getSubcategories.fulfilled, (state, action) => {
      state.subcategories = action.payload.subcategories;
      state.status = "resolved";
    });
    builder.addCase(getSubcategories.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(createSubcategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createSubcategory.fulfilled, (state, action) => {
      state.subcategories.unshift(action.payload.subcategory);
      state.status = "resolved";
      toast.success("Subcategory created successfully");
    });
    builder.addCase(createSubcategory.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
      toast.error(action.payload);
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
      toast.success("Subcategory updated successfully");
    });
    builder.addCase(updateSubcategory.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(deleteSubcategory.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteSubcategory.fulfilled, (state, action) => {
      state.subcategories = state.subcategories.filter(
        (subcategory) => subcategory._id !== action.payload.id
      );
      state.status = "resolved";
      toast.success("Subcategory deleted successfully");
    });
    builder.addCase(deleteSubcategory.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
      toast.error(action.payload);
    });
  },
});

export const {} = SubcategorySlice.actions;

export default SubcategorySlice.reducer;
