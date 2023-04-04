import { combineReducers, configureStore } from "@reduxjs/toolkit";
import explorerReducer from "../../../entities/explorer/model";
import curatorReducer from "../../../entities/curator/model";
import userReducer from "../../../entities/user/model";
import galaxySlice from "../../../entities/galaxy/model/slice";
import logger from "redux-logger";
import { GalaxyType } from "@/entities/galaxy/model/types";

export type RootState = {
  explorerReducer: {
    isExplorer: boolean;
  };
  curatorReducer: {
    isCurator: boolean;
  };
  userReducer: {
    isRegistered: boolean;
  };
  galaxies: GalaxyType,
};

const rootReducer = combineReducers({
  explorer: explorerReducer,
  curator: curatorReducer,
  user: userReducer,
  galaxies: galaxySlice,
});

export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;