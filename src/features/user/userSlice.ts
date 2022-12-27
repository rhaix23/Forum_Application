import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/app.types";
import { IUser } from "../../types/user.types";
import {
  changePassword,
  getMe,
  getSingleUser,
  getUsers,
  login,
  logout,
  register,
  updateAccountStatus,
  updateUser,
} from "./userThunks";
import { toast } from "react-toastify";

interface IUserSliceState {
  users: IUser[];
  user: IUser | null;
  profile: IUser | null;
  status: Status;
  error: string;
}

const initialState: IUserSliceState = {
  users: [],
  user: null,
  profile: null,
  status: "idle",
  error: "",
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
      action.payload && (state.error = action.payload);
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
      action.payload && (state.error = action.payload);
      toast.error(action.payload);
      state.status = "rejected";
    });
    builder.addCase(getMe.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "resolved";
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(logout.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.status = "resolved";
    });
    builder.addCase(logout.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
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
      action.payload && (state.error = action.payload);
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
      action.payload && (state.error = action.payload);
      toast.error(action.payload);
    });
    builder.addCase(updateUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      if (state.profile && state.profile._id === action.payload.user._id) {
        state.profile = action.payload.user;
      }
      state.status = "resolved";
      toast.success("Profile has been updated successfully.");
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
      toast.error(action.payload);
    });
    builder.addCase(getUsers.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.status = "resolved";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = "rejected";
      action.payload && (state.error = action.payload);
    });
    builder.addCase(updateAccountStatus.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateAccountStatus.fulfilled, (state, action) => {
      state.users = state.users.map((user) => {
        if (user._id === action.payload.user._id) {
          return action.payload.user;
        }
        return user;
      });
      state.status = "resolved";
    });
    builder.addCase(updateAccountStatus.rejected, (state, action) => {
      action.payload && (state.error = action.payload);
      state.status = "rejected";
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
