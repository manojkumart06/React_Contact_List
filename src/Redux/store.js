import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./Reducer/contactReducer";



export const store = configureStore({
    reducer : {
        contactReducer
    }
})