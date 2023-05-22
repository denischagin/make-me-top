import { createAsyncThunk } from "@reduxjs/toolkit";

import { URL_MMT_PLANET } from "@shared/constants/urls";

import { FETCH_PLANETS } from "../model/actions";

export const getModalPlanets = createAsyncThunk(
  FETCH_PLANETS,
  async (planetId: number) => {
    try {
      const response = await fetch(
        `${URL_MMT_PLANET}${planetId}`
      );

      return await response.json();
    }
    catch (error) {
      console.log("Не удалось получить список планет");
    }
  }
);
