import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/app.types";
import { IUser } from "../../types/user.types";
import {
  changePassword,
  getMe,
  getSingleUser,
  login,
  logout,
  register,
  updateUser,
} from "./userThunks";
import { toast } from "react-toastify";
import { Action } from "@remix-run/router";

interface IUserSliceState {
  user: IUser | null;
  profile: IUser | null;
  status: Status;
}

const initialState: IUserSliceState = {
  user: null,
  profile: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "resolved";
      toast.success("Registered successfully. Logging in...");
    });
    builder.addCase(register.rejected, (state, action) => {
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(login.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "resolved";
      toast.success("Logged in successfully.");
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(getMe.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "resolved";
    });
    builder.addCase(getMe.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(logout.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.status = "resolved";
    });
    builder.addCase(logout.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(getSingleUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      state.profile = action.payload.user;
      state.status = "resolved";
    });
    builder.addCase(getSingleUser.rejected, (state, action) => {
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(changePassword.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.status = "resolved";
      toast.success("Password has been changed successfully.");
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.status = "rejected";
      toast.error(action.payload);
    });
    builder.addCase(updateUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = "resolved";
      state.user = action.payload.user;
      if (state.profile && state.profile._id === action.payload.user._id) {
        state.profile = action.payload.user;
      }
      toast.success("Profile has been updated successfully.");
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "rejected";
      toast.error(action.payload);
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
