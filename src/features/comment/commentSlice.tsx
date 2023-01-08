import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/app.types";
import { IComment } from "../../types/comment.types";
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
  count: number;
  pages: number;
}

const initialState: ICommentSliceState = {
  comments: [],
  userComments: [],
  status: "idle",
  error: "",
  count: 0,
  pages: 0,
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
      state.count = action.payload.count;
      state.pages = action.payload.pages;
      state.status = "resolved";
    });
    builder.addCase(getComments.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
    });
    builder.addCase(getPostComments.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getPostComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.count = action.payload.count;
      state.pages = action.payload.pages;
      state.status = "resolved";
    });
    builder.addCase(getPostComments.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
    });
    builder.addCase(createComment.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments.unshift(action.payload.comment);
      state.status = "resolved";
      toast.success("Comment has been created");
    });
    builder.addCase(createComment.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
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
      toast.success("Comment has been deleted");
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
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
      action.payload && (state.error = action.payload);
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(getUserComments.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getUserComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
      state.count = action.payload.count;
      state.pages = action.payload.pages;
      state.status = "resolved";
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
