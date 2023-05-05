import { createSlice } from "@reduxjs/toolkit";

import { getGalaxy } from "../api/getGalaxy";

const galaxySlice = createSlice({
  name: "galaxy",
  initialState: {
    galacticId: 0,
    galacticName: "",
    orbitList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGalaxy.fulfilled, (state, action) => {

      state.orbitList = action.payload.orbitList;
      state.galacticId = action.payload.galacticId;
      state.galacticName = action.payload.galacticName;
    });
  },
});

export default galaxySlice.reducer;
