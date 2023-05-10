import { createSlice } from "@reduxjs/toolkit";

import { getGalaxy } from "../api/getGalaxy";

const galaxySlice = createSlice({
  name: "galaxy",
  initialState: {
    galaxyId: 0,
    galaxyName: "",
    orbitList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGalaxy.fulfilled, (state, action) => {

      state.orbitList = action.payload.orbitList;
      state.galaxyId = action.payload.galaxyId;
      state.galaxyName = action.payload.galaxyName;
    });
  },
});

export default galaxySlice.reducer;
