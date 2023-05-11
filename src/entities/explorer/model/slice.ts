import { createSlice } from "@reduxjs/toolkit";

import { getModalPlanets } from "../api/getModalPlanets";

import { ExplorerState } from "./interfaces";

const initialState: ExplorerState = {
  isExplorer: false,
  planetList: [],
};

export const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    selectRoleAsExplorer: (state) => {
      state.isExplorer = !state.isExplorer;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getModalPlanets.fulfilled, (state: any, action: any) => {
      state.planetList = action.payload;
    });
  },
});

export const { selectRoleAsExplorer } = explorerSlice.actions;

export default explorerSlice.reducer;
