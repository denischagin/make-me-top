import { createSlice } from '@reduxjs/toolkit';

import { CuratorState } from './types/interfaces';

import { getKeeperData } from '../thunks/getKeeperData';

import { initialCuratorInfo } from './constants';
import { REVIEW_LIST } from './mocks';

const initialState: CuratorState = {
    isCurator: false,
    reviews: REVIEW_LIST,
    curatorInfo: initialCuratorInfo,
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
            })
            .addCase(getKeeperData.rejected, (state: CuratorState) => {
                state.curatorInfo = initialCuratorInfo;
            });
    },
});

export const {
    selectRoleAsCurator,
} = curatorSlice.actions;

export default curatorSlice.reducer;
