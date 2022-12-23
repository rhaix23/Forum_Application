import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/app.types";
import { ICategory } from "../../types/category.types";
import { IComment } from "../../types/comment.types";
import { api } from "../../utils/axios";
import {
  createComment,
  deleteComment,
  getComments,
  getPostComments,
  getUserComments,
  updateComment,
} from "./commentThunks";
import { toast } from "react-toastify";
import { Action } from "@remix-run/router";

interface ICommentSliceState {
  comments: IComment[];
  userComments: IComment[];
  status: Status;
  error: string;
}

const initialState: ICommentSliceState = {
  comments: [],
  userComments: [],
  status: "idle",
  error: "",
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.status = "resolved";
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(getPostComments.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getPostComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.status = "resolved";
    });
    builder.addCase(getPostComments.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
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
      action.payload && (state.error = action.payload);
      toast.error(action.payload);
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload.id
      );
      state.status = "resolved";
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
      toast.error(action.payload);
    });
    builder.addCase(updateComment.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      const updatedComment = action.payload.comment;
      state.comments = state.comments.map((comment) => {
        if (comment._id === updatedComment._id) {
          return updatedComment;
        }
        return comment;
      });
      state.status = "resolved";
      toast.success("Comment has been updated");
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
      toast.error(action.payload);
    });
    builder.addCase(getUserComments.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getUserComments.fulfilled, (state, action) => {
      state.status = "resolved";
      state.userComments = action.payload.comments;
    });
    builder.addCase(getUserComments.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
      toast.error(action.payload);
    });
  },
});

export const {} = commentSlice.actions;

export default commentSlice.reducer;
