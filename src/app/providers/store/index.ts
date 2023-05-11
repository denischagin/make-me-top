import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import curatorReducer from "@entities/Сurator/model";
import explorerReducer from "@entities/Explorer/model";
import galaxySlice from "@entities/Galaxy/model/slice";
import { GalaxyType } from "@entities/Galaxy/model/types";
import userReducer from "@entities/user/model";

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
  };
  galaxy: GalaxyType;
};

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
