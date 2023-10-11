import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/providers/store';

const userState = (state: RootState) => state.explorer;

export const explorerIsExplorerSelector = createSelector(userState, (userState) => userState.isExplorer);

export const explorerInfoSelector = createSelector(userState, (userState) => userState.explorerInfo);

export const explorerCardInfoSelector = createSelector(userState, (userState) => userState.explorerCardInfo);

export const explorerIsSystemActiveSelector = createSelector(userState, (userState) => userState.isSystemActive);

export const explorersListSelector = createSelector(userState, (userState) => userState.explorersList);

export const explorersIsErrorSelector = createSelector(userState, (userState) => userState.isError);
