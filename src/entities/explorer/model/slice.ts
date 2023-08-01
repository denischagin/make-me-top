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
            .addCase(getExplorerInfo.fulfilled, (state: ExplorerState, action) => {
                state.explorerInfo = action.payload;
            })
            .addCase(getExplorerInfo.rejected, (state: ExplorerState) => {
                state.explorerInfo = initialExplorerInfo;
            })

            .addCase(getExplorerCardInfo.fulfilled, (state: ExplorerState, action) => {
                state.explorerCardInfo = action.payload;
            })
            .addCase(getExplorerCardInfo.rejected, (state: ExplorerState) => {
                state.explorerCardInfo = initialExplorerCardInfo;
            });
    },
});

export const {
    selectRoleAsExplorer,
} = explorerSlice.actions;

export default explorerSlice.reducer;
