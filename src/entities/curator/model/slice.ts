import { createSlice } from '@reduxjs/toolkit';

import { CuratorState } from './types/interfaces';

import { getKeeperData } from '../thunks/getKeeperData';

import { REVIEW_LIST } from './mocks';

const initialState: CuratorState = {
    isCurator: false,
    reviews: REVIEW_LIST,
    curatorInfo: {
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
};

export const curatorSlice = createSlice({
    name: 'curator',
    initialState,
    reducers: {
        selectRoleAsCurator: (state) => {
            state.isCurator = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKeeperData.fulfilled, (state: CuratorState, action) => {
                state.curatorInfo = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const {
    selectRoleAsCurator,
} = curatorSlice.actions;

export default curatorSlice.reducer;
