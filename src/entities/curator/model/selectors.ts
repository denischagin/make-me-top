import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@app/providers/store";

const userState = (state: RootState) => state.curator;

export const isCuratorSelector = createSelector(
  userState,
  (userState) => userState.isCurator
);

export const reviewsSelector = createSelector(
  userState,
  (userState) => userState.reviews
);