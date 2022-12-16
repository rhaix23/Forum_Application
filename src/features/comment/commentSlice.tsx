import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/app.types";
import { ICategory } from "../../types/category.types";
import { IComment } from "../../types/comment.types";
import { api } from "../../utils/axios";
import {
  createComment,
  deleteComment,
  getPostComments,
  updateComment,
} from "./commentThunks";
import { toast } from "react-toastify";

interface ICommentSliceState {
  comments: IComment[];
  status: Status;
}

const initialState: ICommentSliceState = {
  comments: [],
  status: "idle",
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostComments.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getPostComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.status = "resolved";
    });
    builder.addCase(getPostComments.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(createComment.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.status = "resolved";
      toast.success("Comment has been created");
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.status = "resolved";
      toast.success("Comment has been deleted");
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(updateComment.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.status = "resolved";
      toast.success("Comment has been updated");
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.status = "rejected";
      toast.error(action.payload);
    });
  },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
