import { createSlice } from '@reduxjs/toolkit';

import {
    roles,
    storageKeys,
} from '@shared/constants/storageKeys';

import { ExplorerState } from './types/interfaces';

import { getExplorerCardInfo } from '../thunks/getExplorerCardInfo';
import { getExplorerInfo } from '../thunks/getExplorerInfo';
import { getListExplorersByFilter } from '../thunks/getFilterExplorers';

import {
    initialExplorerCardInfo,
    initialExplorerInfo,
    initialExplorersList,
} from './constants';
import { APPLICATION_CARD } from './mocks';

const initialState: ExplorerState = {
    isExplorer: false,
    isSystemActive: true,
    explorerApplicationCard: APPLICATION_CARD,
    explorerInfo: initialExplorerInfo,
    explorerCardInfo: initialExplorerCardInfo,
    explorersList: initialExplorersList,
    isError: false,
};

export const explorerSlice = createSlice({
    name: 'explorer',
    initialState,
    reducers: {
        selectRoleAsExplorer: (state) => {
            state.isExplorer = true;
        },
        declineCurrentSystem: (state) => {
            state.isSystemActive = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExplorerInfo.fulfilled, (state: ExplorerState, action) => {
                state.explorerInfo = action.payload;
                state.isError = false;
            })
            .addCase(getExplorerInfo.rejected, (state: ExplorerState, action) => {
                state.explorerInfo = initialExplorerInfo;
                state.isError = true;
            })

            .addCase(
                getExplorerCardInfo.fulfilled,
                (state: ExplorerState, action) => {
                    state.explorerCardInfo = action.payload;
                    state.isError = false;
                },
            )
            .addCase(getExplorerCardInfo.rejected, (state: ExplorerState, action) => {
                state.explorerCardInfo = initialExplorerCardInfo;
                state.isError = true;
            })

            .addCase(
                getListExplorersByFilter.fulfilled,
                (state: ExplorerState, action) => {
                    state.explorersList = action.payload;
                    state.isError = false;
                },
            )
            .addCase(
                getListExplorersByFilter.rejected,
                (state: ExplorerState, action) => {
                    state.explorersList = initialExplorersList;
                    state.isError = true;
                },
            );
    },
});

export const {
    selectRoleAsExplorer,
    declineCurrentSystem,
} =
	explorerSlice.actions;

export default explorerSlice.reducer;
