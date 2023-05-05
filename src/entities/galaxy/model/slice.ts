import { createSlice } from "@reduxjs/toolkit";

import { getGalaxy } from "../api/getGalaxy";

const galaxySlice = createSlice({
  name: "galaxy",
  initialState: {
    galaxy: {
      galacticId: 0,
      galacticName: "",
      orbitList: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGalaxy.fulfilled, (state, action) => {
      state.galaxy = action.payload;
    });
  },
});

export default galaxySlice.reducer;
