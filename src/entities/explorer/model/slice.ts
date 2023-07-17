import { createSlice } from '@reduxjs/toolkit';

import { ExplorerState } from './types/interfaces';

import { getExplorerData } from '../thunks/getExplorerData';

import { initialExplorerInfo } from './constants';
import { APPLICATION_CARD } from './mocks';

const initialState: ExplorerState = {
    isExplorer: false,
    explorerInfo: initialExplorerInfo,
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
            .addCase(getExplorerData.fulfilled, (state: ExplorerState, action) => {
                state.explorerInfo = action.payload;
            })
            .addCase(getExplorerData.rejected, (state: ExplorerState) => {
                state.explorerInfo = initialExplorerInfo;
            });
    },
});

export const {
    selectRoleAsExplorer,
} = explorerSlice.actions;

export default explorerSlice.reducer;
