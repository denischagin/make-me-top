import { createSlice } from "@reduxjs/toolkit";

import { UserState } from "./interfaces";

const initialState: UserState = {
  isRegistered: true,
  showModal: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectIsUserRegistered: (state) => {
      state.isRegistered = !state.isRegistered;
    },
    logOut: (state) => {
      state.isRegistered = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectIsUserRegistered, logOut } = userSlice.actions;

export default userSlice.reducer;
