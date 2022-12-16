import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/app.types";
import { IPost } from "../../types/post.types";
import {
  createPost,
  deletePost,
  editPost,
  getSinglePost,
  getSubcategoryPosts,
  ratePost,
} from "./postThunks";
import { toast } from "react-toastify";

interface IPostSliceState {
  posts: IPost[];
  post: IPost | null;
  error: string;
  status: Status;
}

const initialState: IPostSliceState = {
  posts: [],
  post: null,
  error: "",
  status: "idle",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubcategoryPosts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getSubcategoryPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.status = "resolved";
    });
    builder.addCase(getSubcategoryPosts.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getSinglePost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.post = action.payload.post;
      state.status = "resolved";
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
    });
    builder.addCase(getSinglePost.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(createPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.post = action.payload.post;
      state.status = "resolved";
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(editPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.post = action.payload.post;
      state.status = "resolved";
      toast.success("Post has been updated");
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(deletePost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deletePost.fulfilled, (state) => {
      state.status = "resolved";
      toast.success("Post has been deleted");
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(ratePost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(ratePost.fulfilled, (state) => {
      state.status = "resolved";
    });
    builder.addCase(ratePost.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
