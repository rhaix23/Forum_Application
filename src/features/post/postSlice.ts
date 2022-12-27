import { createSlice } from "@reduxjs/toolkit";
import { SortOptions, Status } from "../../types/app.types";
import { IPost } from "../../types/post.types";
import {
  createPost,
  deletePost,
  deletePostRate,
  editPost,
  getPosts,
  getSinglePost,
  getSubcategoryPosts,
  getUserPosts,
  ratePost,
  removePost,
  updatePostRate,
} from "./postThunks";
import { toast } from "react-toastify";

interface IPostSliceState {
  posts: IPost[];
  userPosts: IPost[];
  post: IPost | null;
  error: string;
  status: Status;
  sort: SortOptions;
  count: number;
  pages: number;
}

const initialState: IPostSliceState = {
  posts: [],
  userPosts: [],
  post: null,
  error: "",
  status: "idle",
  sort: "-createdAt",
  count: 1,
  pages: 1,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload.sort;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.status = "resolved";
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(getSubcategoryPosts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getSubcategoryPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
      state.count = action.payload.count;
      state.pages = action.payload.pages;
      state.status = "resolved";
    });
    builder.addCase(getSubcategoryPosts.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
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
      state.userPosts = state.userPosts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
    });
    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
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
      const updatedPost = action.payload.post;
      state.post = updatedPost;
      state.posts = state.posts.map((post) => {
        if (post._id === updatedPost._id) {
          return updatedPost;
        }
        return post;
      });
      state.status = "resolved";
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(deletePost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.id
      );
      state.status = "resolved";
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
      toast.error(action.payload);
    });
    builder.addCase(updatePostRate.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updatePostRate.fulfilled, (state) => {
      state.status = "resolved";
    });
    builder.addCase(updatePostRate.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
      toast.error(action.payload);
    });
    builder.addCase(deletePostRate.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deletePostRate.fulfilled, (state) => {
      state.status = "resolved";
    });
    builder.addCase(deletePostRate.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
      toast.error(action.payload);
    });
    builder.addCase(getUserPosts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.userPosts = action.payload.posts;
      state.status = "resolved";
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(removePost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.post = action.payload.post;
      state.status = "resolved";
    });
    builder.addCase(removePost.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
  },
});

export const { setSort } = postSlice.actions;

export default postSlice.reducer;
