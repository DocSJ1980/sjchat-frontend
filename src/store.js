import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from './features/auth/authSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, REGISTER, PURGE, PAUSE, PERSIST } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: [apiSlice.reducerPath],
}
const persistedReducer = persistReducer(persistConfig, authReducer)

const rootReducer = combineReducers({
    auth: persistedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, REGISTER, PURGE, PAUSE, PERSIST]
            }
        }).concat(apiSlice.middleware),
    // middleware: [thunk, apiSlice.middleware],
    devTools: true
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)

export default store
