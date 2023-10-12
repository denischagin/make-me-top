import { viewerApi } from '@entities/viewer/model/api';
import { ViewerState } from '@entities/viewer/model/types';
import { AuthResponse } from '@entities/viewer/model/types/api';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

export const initialState: ViewerState = {
    isAuth: false,
    role: null,
    accessToken: null,
    refreshToken: null,
};

export const viewerSlice = createSlice({
    name: 'viewer',
    initialState,
    reducers: {
        logout: (state) => {
            state = initialState;
        },
        login: (state, { payload }: PayloadAction<AuthResponse>) => {
            state.isAuth = true;
            state.role = payload.role;
            state.accessToken = payload.accessToken.accessToken;
            state.refreshToken = payload.refreshToken.refreshToken;
        },
    },
    // extraReducers: (builder) =>
    //     builder
    //         .addMatcher(
    //             viewerApi.endpoints.refresh.matchFulfilled,
    //             (state, { payload }) => {
    //                 state.isAuth = true;
    //                 state.role = payload.role;
    //                 state.accessToken = payload.accessToken.accessToken;
    //                 state.refreshToken = payload.refreshToken.refreshToken;
    //             },
    //         )
    //         .addMatcher(viewerApi.endpoints.refresh.matchPending, (state) => {
    //             state = initialState;
    //         }),
});

export default viewerSlice.reducer;
export const { logout, login } = viewerSlice.actions;
