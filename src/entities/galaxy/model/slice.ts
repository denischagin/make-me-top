import { createSlice } from '@reduxjs/toolkit';

import { GalaxyType } from '@entities/galaxy/model/types';

import { getGalaxy } from '../thunks/getGalaxy';

const galaxySlice = createSlice({
    name: 'galaxy',
    initialState: {
        galaxyId: 0,
        galaxyName: '',
        orbitList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGalaxy.pending, (state: GalaxyType) => {
            state.galaxyId = 0;
            state.galaxyName = 'Loading...';
            state.orbitList = [];
        });

        builder.addCase(getGalaxy.fulfilled, (state: GalaxyType, action) => {
            state.orbitList = action.payload.orbitList;
            state.galaxyId = action.payload.galaxyId;
            state.galaxyName = action.payload.galaxyName;
        });

        builder.addCase(getGalaxy.rejected, (state: GalaxyType) => {
            state.galaxyId = 0;
            state.galaxyName = 'Not found';
            state.orbitList = [];
        });
    },
});

export default galaxySlice.reducer;
