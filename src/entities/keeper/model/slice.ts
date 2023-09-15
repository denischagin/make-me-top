import { createSlice } from '@reduxjs/toolkit';

import { KeeperState } from './types/interfaces';

import { getKeeperCardInfo } from '../thunks/getKeeperCardInfo';
import { getKeeperInfo } from '../thunks/getKeeperInfo';

import {
    initialKeeperCardInfo,
    initialKeeperInfo,
    initialKeepersList,
} from './constants';
import { getListKeepersByFilter } from '../thunks/getListKeepersByFilter';

const initialState: KeeperState = {
    isKeeper: false,
    keeperInfo: initialKeeperInfo,
    keeperCardInfo: initialKeeperCardInfo,
    keepersList: initialKeepersList
};

export const keeperSlice = createSlice({
    name: 'keeper',
    initialState,
    reducers: {
        selectRoleAsKeeper: (state) => {
            state.isKeeper = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKeeperInfo.fulfilled, (state: KeeperState, action) => {
                state.keeperInfo = action.payload;
            })
            .addCase(getKeeperInfo.rejected, (state: KeeperState) => {
                state.keeperInfo = initialKeeperInfo;
            })

            .addCase(getKeeperCardInfo.fulfilled, (state: KeeperState, action) => {
                state.keeperCardInfo = action.payload;
            })
            .addCase(getKeeperCardInfo.rejected, (state: KeeperState) => {
                state.keeperCardInfo = initialKeeperCardInfo;
            })

            .addCase(getListKeepersByFilter.fulfilled, (state: KeeperState, action) => {
                state.keepersList = action.payload;
            })
            .addCase(getListKeepersByFilter.rejected, (state: KeeperState) => {
                state.keepersList = initialKeepersList;
            });
    },
});

export const {
    selectRoleAsKeeper,
} = keeperSlice.actions;

export default keeperSlice.reducer;
