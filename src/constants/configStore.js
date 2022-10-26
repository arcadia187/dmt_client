import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/userSlice";
const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);
let store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
let persistor = persistStore(store);

export { store, persistor };
