import { createSlice } from '@reduxjs/toolkit';

import { getModalPlanets } from '../thunks/getModalPlanets';

import { UserState } from './types/index';
import {
    EXPLORERS_LIST,
    KEEPERS_LIST,
    USER_INFO,
} from './mocks';

const initialState: UserState = {
    isRegistered: true,
    isModalOpen: false,
    planetList: [],
    explorersList: EXPLORERS_LIST,
    keepersList: KEEPERS_LIST,
    userInfo: USER_INFO,
    userData: {
        openSystemList: [],
        closeSystemList: [],
        educationSystemList: [],
    },

};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        selectIsUserRegistered: (state) => {
            state.isRegistered = !state.isRegistered;
        },
        logOut: (state) => {
            state.isRegistered = true;
        },
        showModal: (state) => {
            state.isModalOpen = !state.isModalOpen;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getModalPlanets.fulfilled, (state: UserState, action) => {
                state.planetList = action.payload;
            })
            .addCase(getModalPlanets.rejected, (state: UserState) => {
                state.planetList = [];
            });
    },
});

export const {
    selectIsUserRegistered,
    logOut,
    showModal,
} = userSlice.actions;

export default userSlice.reducer;
