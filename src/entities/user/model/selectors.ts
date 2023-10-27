import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@app/providers/store';

const userState = (state: RootState) => state.user;

export const userIsModalOpenSelector = createSelector(
    userState,
    (userState) => userState.isModalOpen,
);
