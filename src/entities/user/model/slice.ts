import { createSlice } from '@reduxjs/toolkit';

import { getModalPlanets } from '../thunks/getModalPlanets';
import { getUserData } from '../thunks/getUserData';

import { UserState } from './types/index';
import {
    CURATORS_LIST,
    EXPLORERS_LIST,
    USER_INFO,
} from './mocks';

const initialState: UserState = {
    isRegistered: true,
    isModalOpen: false,
    planetList: [],
    explorersList: EXPLORERS_LIST,
    curatorsList: CURATORS_LIST,
    userInfo: USER_INFO,
    userInfoData: {
        person: {
            personId: 0,
            firstName: '',
            lastName: '',
            patronymic: '',
            registrationDate: '',
        },
        rating: null,
        totalSystems: 0,
        totalExplorers: 0,
        studyingExplorers: [],
        studyRequests: [],
        finalAssessments: [],
        reviewRequests: [],
    },
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
            // получение списка планет
            .addCase(getModalPlanets.fulfilled, (state: UserState, action) => {
                state.planetList = action.payload;
            })
            .addCase(getModalPlanets.rejected, (state) => {
                state.planetList = [];
            })
            // получение информации о пользователе
            .addCase(getUserData.fulfilled, (state: UserState, action) => {
                state.userInfoData = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    selectIsUserRegistered,
    logOut,
    showModal,
} = userSlice.actions;

export default userSlice.reducer;
