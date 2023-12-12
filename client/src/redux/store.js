import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../modules/auth/redux/UserReducer";

export const store = configureStore({
    reducer: {
        user: userReducer
    },
})