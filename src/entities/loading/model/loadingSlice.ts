import { createSlice } from '@reduxjs/toolkit';

import { authLogin } from '@entities/user/thunks/authLogin';
import { getCourseInfo } from '@entities/user/thunks/getCourseInfo';
import { getModalPlanets } from '@entities/user/thunks/getModalPlanets';
import { postCourseRequest } from '@entities/user/thunks/postCourseRequest';

import { closeCourseRequest } from '@entities/explorer/thunks/closeCourseRequest';
import { getExplorerCardInfo } from '@entities/explorer/thunks/getExplorerCardInfo';
import { getExplorerInfo } from '@entities/explorer/thunks/getExplorerInfo';

import { acceptOrRejectCourseRequest } from '@entities/keeper/thunks/acceptOrRejectCourseRequest';
import { getKeeperCardInfo } from '@entities/keeper/thunks/getKeeperCardInfo';
import { getKeeperInfo } from '@entities/keeper/thunks/getKeeperInfo';

import { getGalaxy } from '@entities/galaxy/thunks/getGalaxy';

import { setLoadingForThunks } from '@shared/utils/setLoadingForThunks';

import { LoadingState } from './types';

const initialState: LoadingState = {
    isLoading: false,
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = !state.isLoading;
        },
    },
    extraReducers: (builder) => {
        setLoadingForThunks(
            builder,
            [
                authLogin,
                getModalPlanets,
                getCourseInfo,
                postCourseRequest,
                closeCourseRequest,
                getExplorerCardInfo,
                getExplorerInfo,
                acceptOrRejectCourseRequest,
                getKeeperCardInfo,
                getKeeperInfo,
                getGalaxy,
                // сюда добавляются запросы к которым надо добавить спиннер
            ],
        );
    },
});

export const {
    setLoading,
} = loadingSlice.actions;

export default loadingSlice.reducer;