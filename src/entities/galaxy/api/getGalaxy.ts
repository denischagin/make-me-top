import { createAsyncThunk } from "@reduxjs/toolkit";

import { FETCH_GALAXY } from "@entities/galaxy/model/actions";

interface IFetchGalaxy {
  galaxy?: number;
}

export const getGalaxy = createAsyncThunk(
  `${FETCH_GALAXY}`,
  async (payload: IFetchGalaxy, thunkAPI) => {
    const response = await fetch(
      process.env.REACT_APP_FETCH_URL + "/galactic/1"
    );
    return await response.json();
  }
);
