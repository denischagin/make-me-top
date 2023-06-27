import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import explorerReducer from "@entities/explorer/model";
import galaxySlice from "@entities/galaxy/model/slice";
import { GalaxyType } from "@entities/galaxy/model/types";
import userReducer from "@entities/user/model/slice";
import { UserStateType } from "@entities/user/model/types";
import curatorReducer from "@entities/curator/model";

const rootReducer = combineReducers({
  explorer: explorerReducer,
  curator: curatorReducer,
  user: userReducer,
  galaxy: galaxySlice,
});

export type RootState = {
  explorer: {
    isExplorer: boolean;
  };
  curator: {
    isCurator: boolean;
  };
  user: {
    isRegistered: boolean;
    isModalOpen: boolean;
    userData: UserStateType;
  };
  galaxy: GalaxyType;
};

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;