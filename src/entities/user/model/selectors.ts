import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@app/providers/store";

const userState = (state: RootState) => state.user;

export const userInfoSelector = createSelector(
  userState,
  (userState) => userState.userInfo
);

export const isModalOpenSelector = createSelector(
  userState,
  (userState) => userState.isModalOpen
);

export const planetListSelector = createSelector(
  userState,
  (userState) => userState.planetList
);

export const explorersListSelector = createSelector(
  userState,
  (userState) => userState.explorersList
);

export const curatorsListSelector = createSelector(
  userState,
  (userState) => userState.curatorsList
);