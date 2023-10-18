import { viewerApi } from '@entities/viewer/api/api';
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
            state.isAuth = false;
            state.role = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
        login: (state, { payload }: PayloadAction<AuthResponse>) => {
            state.isAuth = true;
            state.role = payload.role;
            state.accessToken = payload.accessToken.accessToken;
            state.refreshToken = payload.refreshToken.refreshToken;
        },
    },
});

export default viewerSlice.reducer;
export const { logout, login } = viewerSlice.actions;
