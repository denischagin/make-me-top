import {
    createSlice,
    isAnyOf,
} from '@reduxjs/toolkit';

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
            .addCase(getModalPlanets.fulfilled, (state: UserState, action) => {
                state.planetList = action.payload;
            })
            .addCase(getModalPlanets.rejected, (state: UserState) => {
                state.planetList = [];
            })

            .addCase(getCourseInfo.fulfilled, (state: UserState, action) => {
                state.courseInfo = action.payload;
            })
            .addCase(getCourseInfo.rejected, (state: UserState) => {
                state.courseInfo = initialCourseInfo;
            });
    },
});

export const {
    selectIsUserRegistered,
    logOut,
    showModal,
} = userSlice.actions;

export default userSlice.reducer;
