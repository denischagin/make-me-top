import { createSlice } from '@reduxjs/toolkit';

import { KeeperState } from './types/interfaces';

import { getKeeperCardInfo } from '../thunks/getKeeperCardInfo';
import { getKeeperInfo } from '../thunks/getKeeperInfo';

import {
    initialKeeperCardInfo,
    initialKeeperInfo,
} from './constants';

const initialState: KeeperState = {
    isKeeper: false,
    keeperInfo: initialKeeperInfo,
    keeperCardInfo: initialKeeperCardInfo,
};

export const keeperSlice = createSlice({
    name: 'curator',
    initialState,
    reducers: {
        selectRoleAsKeeper: (state) => {
            state.isKeeper = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type === getKeeperInfo.fulfilled.type || action.type === getKeeperInfo.rejected.type,
                (state: KeeperState, action) => {
                    state.keeperInfo = action.payload ?? initialKeeperInfo;
                },
            )
            .addMatcher(
                (action) => action.type === getKeeperCardInfo.fulfilled.type || action.type === getKeeperCardInfo.rejected.type,
                (state: KeeperState, action) => {
                    state.keeperCardInfo = action.payload ?? initialKeeperCardInfo;
                },
            );
    },
});

export const {
    selectRoleAsKeeper,
} = keeperSlice.actions;

export default keeperSlice.reducer;
