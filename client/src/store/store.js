import { configureStore } from "@reduxjs/toolkit"
import emailReducer from "./emailSlice"
import emailDetailReducer from "./emailDetailsSlice"


const store = configureStore({
    reducer: {
        emails: emailReducer,
        emailDetails: emailDetailReducer
    }
})

export default store