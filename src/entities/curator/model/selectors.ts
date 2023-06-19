import { RootState } from '@app/providers/store';

import { createSelector } from '@reduxjs/toolkit';

const userState = (state: RootState) => state.curator;

export const curatorIsCuratorSelector = createSelector(userState, (userState) => userState.isCurator);

export const curatorReviewsSelector = createSelector(userState, (userState) => userState.reviews);
