import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import userReducer from '@entities/user/model/slice';
import { UserState } from '@entities/user/model/types';

import explorerReducer from '@entities/explorer/model/slice';
import { ExplorerState } from '@entities/explorer/model/types/interfaces';

import keeperReducer from '@entities/keeper/model/slice';
import { KeeperState } from '@entities/keeper/model/types/interfaces';

import galaxyReducer from '@entities/galaxy/model/slice';
import { GalaxyState } from '@entities/galaxy/model/types';

export type RootState = {
    explorer: ExplorerState;
    keeper: KeeperState;
    user: UserState;
    galaxies: GalaxyState;
};

const rootReducer = combineReducers({
    explorer: explorerReducer,
    keeper: keeperReducer,
    user: userReducer,
    galaxies: galaxyReducer,
});

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;