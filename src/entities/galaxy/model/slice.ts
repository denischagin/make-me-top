import { createSlice } from '@reduxjs/toolkit';

import { initialUserProgressByGalaxy } from '@entities/galaxy/model/constants';
import { GalaxyState } from '@entities/galaxy/model/types';
import { getUserProgressInGalaxy } from '@entities/galaxy/thunks/getUserProgressInGalaxy';

import { getGalaxy } from '../thunks/getGalaxy';

const initialState: GalaxyState = {
    galaxyId: 0,
    galaxyName: '',
    orbitList: [],
    userProgress: initialUserProgressByGalaxy,
};

export const galaxySlice = createSlice({
    name: 'galaxy',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGalaxy.pending, (state: GalaxyState) => {
                state.galaxyId = 0;
                state.galaxyName = 'Loading...';
                state.orbitList = [];
            })
            .addCase(getGalaxy.fulfilled, (state: GalaxyState, action) => {
                state.orbitList = action.payload.orbitList;
                state.galaxyId = action.payload.galaxyId;
                state.galaxyName = action.payload.galaxyName;
            })
            .addCase(getGalaxy.rejected, (state: GalaxyState) => {
                state.galaxyId = 0;
                state.galaxyName = 'Not found';
                state.orbitList = [];
            })

            .addCase(getUserProgressInGalaxy.pending, (state: GalaxyState) => {
                state.userProgress = initialUserProgressByGalaxy;
            })
            .addCase(getUserProgressInGalaxy.fulfilled, (state: GalaxyState, action) => {
                state.userProgress.closedSystems = action.payload.closedSystems;
                state.userProgress.openedSystems = action.payload.openedSystems;
                state.userProgress.studiedSystems = action.payload.studiedSystems;
            })
            .addCase(getUserProgressInGalaxy.rejected, (state: GalaxyState) => {
                state.userProgress = initialUserProgressByGalaxy;
            });
    },
});

export default galaxySlice.reducer;
