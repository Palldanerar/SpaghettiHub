import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface appSliceState {
    currentUser: {
        username?: string;
        picture?: string;
        email?: string;
        savedCodes?: string[];
        bio?: string;
    };
    isLoggedIn: boolean;
}

const initialState: appSliceState = {
    currentUser: {},
    isLoggedIn: false,
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
    },
});

export default AppSlice.reducer;
export const { updateCurrentUser, updateIsLoggedIn } = AppSlice.actions;