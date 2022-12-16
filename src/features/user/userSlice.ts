import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/app.types";
import { IUser } from "../../types/user.types";
import { getMe, login, logout } from "./userThunks";
import { toast } from "react-toastify";

interface IUserSliceState {
  user: IUser | null;
  status: Status;
}

const initialState: IUserSliceState = {
  user: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "resolved";
      toast.success("Logged in successfully");
    });
    builder.addCase(login.rejected, (state) => {
      state.status = "rejected";
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
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
