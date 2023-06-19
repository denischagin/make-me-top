import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/providers/store';

const userState = (state: RootState) => state.explorer;

export const explorerIsExplorerSelector = createSelector(userState, (userState) => userState.isExplorer);
