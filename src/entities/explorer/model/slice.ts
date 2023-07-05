import { createSlice } from '@reduxjs/toolkit';

import { ExplorerState } from './interfaces';

import { APPLICATION_CARD } from './mocks';

const initialState: ExplorerState = {
    isExplorer: false,
    applicationCard: APPLICATION_CARD,
};

export const explorerSlice = createSlice({
    name: 'explorer',
    initialState,
    reducers: {
        selectRoleAsExplorer: (state) => {
            state.isExplorer = !state.isExplorer;
        },
    },
});

export const {
    selectRoleAsExplorer,
} = explorerSlice.actions;

export default explorerSlice.reducer;
