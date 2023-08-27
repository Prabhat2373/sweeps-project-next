import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../rtk/userApi";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userSlice from "../slices/userSlice";
import { mainApi } from "../rtk/mainApi";
import { testApi } from "../rtk/testApi";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = persistReducer(persistConfig, userSlice);
export const store = configureStore({
  reducer: {
    user: rootReducer,
    [userApi.reducerPath]: userApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(testApi.middleware)
      .concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
