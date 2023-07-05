import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/providers/store';

const userState = (state: RootState) => state.user;

export const userInfoSelector = createSelector(userState, (userState) => userState.userInfo);

export const userIsModalOpenSelector = createSelector(userState, (userState) => userState.isModalOpen);

export const userPlanetListSelector = createSelector(userState, (userState) => userState.planetList);

export const userExplorersListSelector = createSelector(userState, (userState) => userState.explorersList);

export const userCuratorsListSelector = createSelector(userState, (userState) => userState.curatorsList);
