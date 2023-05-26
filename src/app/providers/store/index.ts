import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "@entities/user/model/slice";
import { UserState } from "@entities/user/model/types";

import { ExplorerState } from "@entities/explorer/model/interfaces";
import explorerReducer from "@entities/explorer/model/slice";

import { CuratorState } from "@entities/curator/model/types/interfaces";
import curatorReducer from "@entities/curator/model/slice";

import galaxySlice from "@entities/galaxy/model/slice";
import { GalaxyType } from "@entities/galaxy/model/types";

export type RootState = {
  explorer: ExplorerState;
  curator: CuratorState;
  user: UserState;
  galaxies: GalaxyType;
};

const rootReducer = combineReducers({
  explorer: explorerReducer,
  curator: curatorReducer,
  user: userReducer,
  galaxies: galaxySlice,
});

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
