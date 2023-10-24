import { combineReducers, configureStore } from '@reduxjs/toolkit';

import viewerReducer, { viewerApi, ViewerState } from '@entities/viewer';

import userReducer from '@entities/user/model/slice';
import { UserState } from '@entities/user/model/types';

import loadingReducer from '@entities/loading/model/loadingSlice';
import { LoadingState } from '@entities/loading/model/types';

import { galaxiesApi } from '@entities/galaxy/api/api';
import { GalaxyState } from '@entities/galaxy/model/types';
import { explorerApi } from '@entities/explorer/api';
import { keeperApi } from '@entities/keeper/api';
import { baseApi } from '@shared/api/baseApi';

const rootReducer = combineReducers({
    user: userReducer,
    loading: loadingReducer,
    viewer: viewerReducer,
    [galaxiesApi.reducerPath]: galaxiesApi.reducer,
    [viewerApi.reducerPath]: viewerApi.reducer,
    [explorerApi.reducerPath]: explorerApi.reducer,
    [keeperApi.reducerPath]: keeperApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer> 

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            galaxiesApi.middleware,
            viewerApi.middleware,
            explorerApi.middleware,
            keeperApi.middleware,
            baseApi.middleware,
        ]),
});

export default store;
