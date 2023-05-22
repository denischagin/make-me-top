import { createSlice } from "@reduxjs/toolkit";

import { UserState } from "./types/index";

import { getModalPlanets } from "../thunks/getModalPlanets";

import { CURATORS_LIST, EXPLORERS_LIST, USER_INFO } from "./mocks";

const initialState: UserState = {
  isRegistered: true,
  isModalOpen: false,
  planetList: [],
  explorersList: EXPLORERS_LIST,
  curatorsList: CURATORS_LIST,
  userInfo: USER_INFO
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
    showModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getModalPlanets.fulfilled, (state: UserState, action) => {
        state.planetList = action.payload;
      })
      .addCase(getModalPlanets.rejected, (state) => {
        state.planetList = [];
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  selectIsUserRegistered,
  logOut,
  showModal
} = userSlice.actions;

export default userSlice.reducer;
