import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {registrationAuthLoginReducer} from "./registr-login-auth-reducer";
import thunkMiddleware from "redux-thunk";
import {errorReducer} from "./error-reducer";


const rootReducers = combineReducers({
    registrationAuthLoginReducer: registrationAuthLoginReducer,
    errorReducer: errorReducer
})


export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})


export type AppRootStateType = ReturnType<typeof rootReducers>