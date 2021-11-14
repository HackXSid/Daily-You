import { applyMiddleware, createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";
import logger from "redux-logger";
import { authenticationReducer } from "../reducers/authentication.reducer";

const KEY = "Daily-You-Redux";

let middleware = null;
if (process.env.NODE_ENV === "production") {
  middleware = applyMiddleware(thunk);
} else {
  middleware = applyMiddleware(thunk, logger);
}

const persistConfig = {
  key: KEY,
  storage: storage,
};

const rootReducer = combineReducers({ authenticationReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

export { store, persistor };
