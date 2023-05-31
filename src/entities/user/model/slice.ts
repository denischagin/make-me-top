import { createSlice } from "@reduxjs/toolkit";

import { getUser } from "@entities/user/api/getUser";
import { UserStateType } from "@entities/user/model/types";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isRegistered: true,
    isModalOpen: false,
    userData: {
      username: "user",
      openSystemList: [],
      closeSystemList: [],
      educationSystemList: [],
    },
  },
  reducers: {
    selectIsUserRegistered: (state) => {
      state.isRegistered = !state.isRegistered;
    },
    logOut: (state) => {
      state.isRegistered = true;
    },
    showModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state: UserStateType, action) => {
      state.userData = action.payload;
    });
  },
});

export const { selectIsUserRegistered, logOut, showModal } = userSlice.actions;

export default userSlice.reducer;