import { viewerApi } from '@entities/viewer/model/api';
import { ViewerState } from '@entities/viewer/model/types';
import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

export const initialState: ViewerState = {
    isAuth: false,
    currentRole: 'GUEST',
    accessToken: null,
    refreshToken: null,
};

export const viewerSlice = createSlice({
    name: 'viewer',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addMatcher(
                viewerApi.endpoints.refresh.matchFulfilled,
                (state, { payload }) => {
                    state.isAuth = true;
                    state.currentRole = payload.role;
                    state.accessToken = payload.accessToken;
                    state.refreshToken = payload.refreshToken;
                },
            )
            .addMatcher(
                viewerApi.endpoints.refresh.matchPending,
                (state) => {
                    state = initialState
                },
            ),
});

export default viewerSlice.reducer;
