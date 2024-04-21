import { configureStore } from "@reduxjs/toolkit";
import CodeSlices from "./slices/CodeSlices";

export const store = configureStore({
    reducer: {
        CodeSlices,
    }
})

export type RootState = ReturnType<typeof store.getState>;