import { createSlice } from "@reduxjs/toolkit";

import { getGalaxy } from "../api/getGalaxy";

const galaxySlice = createSlice({
  name: "galaxy",
  initialState: {
    galaxy: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGalaxy.fulfilled, (state, action) => {
      state.galaxy = action.payload;
    });
  },
});

export default galaxySlice.reducer;
