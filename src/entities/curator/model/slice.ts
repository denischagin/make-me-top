import { createSlice } from '@reduxjs/toolkit';

import { CuratorState } from './types/interfaces';

import { REVIEW_LIST } from './mocks';

const initialState: CuratorState = {
    isCurator: false,
    reviews: REVIEW_LIST,
};

export const curatorSlice = createSlice({
    name: 'curator',
    initialState,
    reducers: {
        selectRoleAsCurator: (state) => {
            state.isCurator = true;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    selectRoleAsCurator,
} = curatorSlice.actions;

export default curatorSlice.reducer;
