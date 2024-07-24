import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from './cartSlice';
import userReducer from "./userSlice";


const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (buildGetDefaultMiddleware) => 
    buildGetDefaultMiddleware({
        serializableCheck: false,
    }),
}); 

export const persistor = persistStore(store);