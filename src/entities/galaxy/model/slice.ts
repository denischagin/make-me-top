import { createSlice } from '@reduxjs/toolkit';

import { GalaxyState } from '@entities/galaxy/model/types';

import { getGalaxy } from '../thunks/getGalaxy';

const initialState: GalaxyState = {
    galaxyId: 0,
    galaxyName: '',
    orbitList: [],
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
            });
    },
});

export default galaxySlice.reducer;
