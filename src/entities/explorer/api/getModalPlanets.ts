import { createAsyncThunk } from "@reduxjs/toolkit";

import { URL_MMT_PLANET } from "@shared/constants/urls";

const planetId = "10";

export const getModalPlanets = createAsyncThunk(
  "FETCH_PLANETS",
  async () => {
    const response = await fetch(
      `${URL_MMT_PLANET}${planetId}`
    );

    return await response.json();
  }
);
