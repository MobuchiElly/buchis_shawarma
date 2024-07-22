import { createSlice } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const initialState = null;

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        clearUser: (state) => {
            return null;
        }
    }
})

export const {addUser, clearUser} = userSlice.actions;
export default userSlice.reducer;