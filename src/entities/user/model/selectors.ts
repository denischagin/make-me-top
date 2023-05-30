import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@app/providers/store";

const userState = (state: RootState) => state.user;

export const userInfoSelector = createSelector(
  userState,
  (userState) => userState.userInfo
);