import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/providers/store';

const loadingState = (state: RootState) => state.loading;

export const loadingIsLoadingSelector = createSelector(loadingState, (loadingState) => loadingState.isLoading);
