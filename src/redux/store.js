import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, ...getDefaultMiddleware()],
});
export const persistor = persistStore(store);

export default store;
