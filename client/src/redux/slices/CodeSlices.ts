import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface CodeSliceStateInterface {
    fullCode: {
        html: string,
        css: string,
        javascript: string,
    }
    currentLanguage: "html" | "css" | "javascript",
}

const initialState: CodeSliceStateInterface = {
    fullCode: {
        html: "",
        css: "",
        javascript: ""
    },
    currentLanguage: "html",
};

const CodeSlice = createSlice({
    name: "CodeSlice",
    initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<CodeSliceStateInterface["currentLanguage"]>) => {
            state.currentLanguage = action.payload;
        },
        updateCodeValue: (state, action: PayloadAction<string>) => {
            state.fullCode[state.currentLanguage] = action.payload;
        },
    },
});

export default CodeSlice.reducer;
export const { updateCurrentLanguage, updateCodeValue } = CodeSlice.actions;