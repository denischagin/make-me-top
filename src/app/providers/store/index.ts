import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import viewerReducer, { viewerApi } from '@entities/viewer';
import { ViewerState } from '@entities/viewer';

import userReducer from '@entities/user/model/slice';
import { UserState } from '@entities/user/model/types';

import loadingReducer from '@entities/loading/model/loadingSlice';
import { LoadingState } from '@entities/loading/model/types';

import explorerReducer from '@entities/explorer/model/slice';
import { ExplorerState } from '@entities/explorer/model/types/interfaces';

import keeperReducer from '@entities/keeper/model/slice';
import { KeeperState } from '@entities/keeper/model/types/interfaces';

import { galaxiesApi } from '@entities/galaxy/model/api';
import galaxyReducer from '@entities/galaxy/model/slice';
import { GalaxyState } from '@entities/galaxy/model/types';
import { explorerApi } from '@entities/explorer/api';
import { userApi } from '@entities/user/model/api';
import { keeperApi } from '@entities/keeper/api';

export type RootState = {
    explorer: ExplorerState;
    keeper: KeeperState;
    user: UserState;
    galaxies: GalaxyState;
    loading: LoadingState;
    viewer: ViewerState;
};

const rootReducer = combineReducers({
    explorer: explorerReducer,
    keeper: keeperReducer,
    user: userReducer,
    galaxies: galaxyReducer,
    loading: loadingReducer,
    viewer: viewerReducer,
    [galaxiesApi.reducerPath]: galaxiesApi.reducer,
    [viewerApi.reducerPath]: viewerApi.reducer,
    [explorerApi.reducerPath]: explorerApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [keeperApi.reducerPath]: keeperApi.reducer,
    
});

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            galaxiesApi.middleware,
            viewerApi.middleware,
            explorerApi.middleware,
            userApi.middleware,
            keeperApi.middleware,
        ]),
});

export default store;
