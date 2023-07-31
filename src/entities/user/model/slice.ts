import { createSlice } from '@reduxjs/toolkit';

import { getCourseInfo } from '../thunks/getCourseInfo';
import { getModalPlanets } from '../thunks/getModalPlanets';

import { UserState } from './types/index';
import { initialCourseInfo } from './constants';

const initialState: UserState = {
    isRegistered: true,
    isModalOpen: false,
    planetList: [],
    courseInfo: initialCourseInfo,
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
            .addMatcher(
                (action) => action.type === getModalPlanets.fulfilled.type || action.type === getModalPlanets.rejected.type,
                (state: UserState, action) => {
                    state.planetList = action.payload ?? [];
                },
            )
            .addMatcher(
                (action) => action.type === getCourseInfo.fulfilled.type || action.type === getCourseInfo.rejected.type,
                (state: UserState, action) => {
                    state.courseInfo = action.payload ?? initialCourseInfo;
                },
            );
    },
});

export const {
    selectIsUserRegistered,
    logOut,
    showModal,
} = userSlice.actions;

export default userSlice.reducer;
