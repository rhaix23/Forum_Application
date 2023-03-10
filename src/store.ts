import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  categorySlice,
  commentSlice,
  postSlice,
  subcategorySlice,
  userSlice,
} from "./features";
import reportSlice from "./features/report/reportSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    subcategory: subcategorySlice,
    post: postSlice,
    comment: commentSlice,
    report: reportSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
