import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/app.types";
import { ICategory } from "../../types/category.types";
import { fetchCategories } from "./categoryThunks";

interface ICategorySliceState {
  categories: ICategory[];
  status: Status;
}

const initialState: ICategorySliceState = {
  categories: [],
  status: "idle",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.categories;
      state.status = "resolved";
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
