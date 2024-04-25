import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface appSliceState {
    currentUser: {
        username?: string;
        picture?: string;
        email?: string;
        savedCodes?: string[];
    };
    isLoggedIn: boolean;
    currentWidth: number;
}

const initialState: appSliceState = {
    currentUser: {},
    isLoggedIn: false,
    currentWidth: window.innerWidth,
};

const AppSlice = createSlice({
    name: "AppSlice",
    initialState,
    reducers: {
        updateCurrentUser: ( state, action: PayloadAction<appSliceState["currentUser"]>) => {
            state.currentUser = action.payload;
        },
        updateIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setCurrentWidth: (state, action: PayloadAction<number>) => {
            state.currentWidth = action.payload;
        },
    },
});

export default AppSlice.reducer;
export const { updateCurrentUser, updateIsLoggedIn, setCurrentWidth } = AppSlice.actions;