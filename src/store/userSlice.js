import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  user: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.status = true;
      state.user = action.payload;
    },
    logout(state, action) {
      state.status = false;
      state.user = null;
    },
  },
});

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
