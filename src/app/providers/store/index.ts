import { configureStore } from "@reduxjs/toolkit";

import curatorReducer from "@/entities/curator/model";
import explorerReducer from "@/entities/explorer/model";
import userReducer from "@/entities/user/model";

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
};

export default configureStore({
  reducer: {
    explorerReducer,
    curatorReducer,
    userReducer,
  },
});
