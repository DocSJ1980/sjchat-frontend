import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from './features/auth/authSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, REGISTER, PURGE, PAUSE, PERSIST } from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
// import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
// im0port autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: [apiSlice.reducerPath],
}
// const rootReducer = combineReducers({
// [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authReducer,
// })
// This would produce the following state object
const persistedReducer = persistReducer(persistConfig, authReducer)


const store = configureStore({
    reducer: persistedReducer,
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