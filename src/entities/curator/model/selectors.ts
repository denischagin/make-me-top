import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/providers/store';

const userState = (state: RootState) => state.curator;

export const curatorIsCuratorSelector = createSelector(userState, (userState) => userState.isCurator);

export const curatorReviewsSelector = createSelector(userState, (userState) => userState.reviews);
