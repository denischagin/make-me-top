import { RootState } from '@app/providers/store';

import { createSelector } from '@reduxjs/toolkit';

const userState = (state: RootState) => state.explorer;

export const explorerIsExplorerSelector = createSelector(userState, (userState) => userState.isExplorer);
