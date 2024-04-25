import { configureStore } from "@reduxjs/toolkit";
import CodeSlices from "./slices/CodeSlices";
import { api } from "./slices/api";
import AppSlice from "./slices/AppSlice";

export const store = configureStore({
    reducer: {
        CodeSlices,
        AppSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>;