import { createSlice } from '@reduxjs/toolkit';

import { ExplorerState } from './types/interfaces';

import { getExplorerData } from '../thunks/getExplorerData';

const initialState: ExplorerState = {
    isExplorer: false,
    explorerInfo: {
        person: {
            personId: 0,
            firstName: '',
            lastName: '',
            patronymic: '',
            registrationDate: '',
        },
        currentSystem: {
            keeper: {
                personId: 0,
                firstName: '',
                lastName: '',
                patronymic: '',
                keeperId: 0,
            },
            courseThemeId: 0,
            courseThemeTitle: '',
            courseId: 0,
            courseTitle: '',
            progress: 0,
        },
        rating: null,
        totalSystems: 0,
        investigatedSystems: [],
        ratingTable: [],
    },
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
            });
    },
});

export const {
    selectRoleAsExplorer,
} = explorerSlice.actions;

export default explorerSlice.reducer;
