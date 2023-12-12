import { createSlice } from "@reduxjs/toolkit";

let string = window.localStorage.getItem("TravelAccount");

let init = {};

if (!string) {
    init = {};
} else {
    init = JSON.parse(string);
}


const userSlice = createSlice({
    name: "user",
    initialState: init,
    reducers: {
        userLogin: function (state, action) {
            window.localStorage.setItem("TravelAccount", JSON.stringify(action.payload));
            return action.payload;
        },
    },
});

export const { userLogin } = userSlice.actions;
export const UserData = (state) => state.user;
export const userReducer = userSlice.reducer;


