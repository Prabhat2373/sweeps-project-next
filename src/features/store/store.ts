import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../rtk/userApi";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userSlice from "../slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = persistReducer(persistConfig, userSlice);
export const store = configureStore({
  reducer: {
    user: rootReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
