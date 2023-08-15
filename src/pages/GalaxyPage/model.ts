import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/providers/store';

const galaxyState = (state: RootState) => state.galaxies;

export const galaxyNameSelector = createSelector(galaxyState, (galaxyState) => galaxyState.galaxyName);

export const orbitListSelector = createSelector(galaxyState, (galaxyState) => galaxyState.orbitList);

export const userProgressSelector = createSelector(galaxyState, (galaxyState) => galaxyState.userProgress);