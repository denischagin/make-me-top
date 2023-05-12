import { createAsyncThunk } from "@reduxjs/toolkit";

import { URL_MMT_PLANET } from "@shared/constants/urls";

export const getModalPlanets = createAsyncThunk(
  "FETCH_PLANETS",
  async (planetId: number) => {
    const response = await fetch(
      `${URL_MMT_PLANET}${planetId}`
    );

    return await response.json();
  }
);
