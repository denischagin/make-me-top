import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/providers/store';

const userState = (state: RootState) => state.explorer;

export const explorerIsExplorerSelector = createSelector(userState, (userState) => userState.isExplorer);

export const explorerApplicationCardSelector = createSelector(userState, (userState) => userState.explorerApplicationCard);

export const explorerInfoSelector = createSelector(userState, (userState) => userState.explorerInfo);

export const explorerCardInfoSelector = createSelector(userState, (userState) => userState.explorerCardInfo);