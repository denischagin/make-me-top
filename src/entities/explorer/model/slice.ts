import { createSlice } from '@reduxjs/toolkit';

import { ExplorerState } from './types/interfaces';

import { getExplorerCardInfo } from '../thunks/getExplorerCardInfo';
import { getExplorerInfo } from '../thunks/getExplorerInfo';

import {
    initialExplorerCardInfo,
    initialExplorerInfo,
} from './constants';
import { APPLICATION_CARD } from './mocks';

const initialState: ExplorerState = {
    isExplorer: false,
    explorerApplicationCard: APPLICATION_CARD,
    explorerInfo: initialExplorerInfo,
    explorerCardInfo: initialExplorerCardInfo,
};

export const explorerSlice = createSlice({
    name: 'explorer',
    initialState,
    reducers: {
        selectRoleAsExplorer: (state) => {
            state.isExplorer = !state.isExplorer;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type === getExplorerInfo.fulfilled.type || action.type === getExplorerInfo.rejected.type,
                (state: ExplorerState, action) => {
                    state.explorerInfo = action.payload ?? initialExplorerInfo;
                },
            )
            .addMatcher(
                (action) => action.type === getExplorerCardInfo.fulfilled.type || action.type === getExplorerCardInfo.rejected.type,
                (state: ExplorerState, action) => {
                    state.explorerCardInfo = action.payload ?? initialExplorerCardInfo;
                },
            );
    },
});

export const {
    selectRoleAsExplorer,
} = explorerSlice.actions;

export default explorerSlice.reducer;
