import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/providers/store';

const userState = (state: RootState) => state.keeper;

export const keeperIsKeeperSelector = createSelector(userState, (userState) => userState.isKeeper);

export const keeperInfoSelector = createSelector(userState, (userState) => userState.keeperInfo);

export const keeperCardInfoSelector = createSelector(userState, (userState) => userState.keeperCardInfo);

export const keepersListSelector = createSelector(userState, (userState) => userState.keepersList);