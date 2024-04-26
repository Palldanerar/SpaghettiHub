import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface CodeSliceStateInterface {
    fullCode: {
        html: string,
        css: string,
        javascript: string,
    }
    currentLanguage: "html" | "css" | "javascript",
    isOwner: boolean;
}

const initialState: CodeSliceStateInterface = {
    fullCode: {
        html: "",
        css: "",
        javascript: ""
    },
    currentLanguage: "html",
    isOwner: false,
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
        updateFullCode: (state, action: PayloadAction<CodeSliceStateInterface["fullCode"]>) => {
            state.fullCode = action.payload
        },
        updateIsOwner: (state, action: PayloadAction<boolean>) => {
            state.isOwner = action.payload;
        },
    },
});

export default CodeSlice.reducer;
export const { updateCurrentLanguage, updateCodeValue, updateFullCode, updateIsOwner } = CodeSlice.actions;