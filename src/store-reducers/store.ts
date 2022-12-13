import {combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {registrationAuthLoginReducer} from "./registr-login-auth-reducer";
import thunkMiddleware from "redux-thunk";
import {errorReducer} from "./error-reducer";
import {packsReducer} from "./packs-reducer";
import {cardsReducer} from "./cards-reducer";


const rootReducers = combineReducers({
    registrationAuthLoginReducer: registrationAuthLoginReducer,
    errorReducer: errorReducer,
    packsReducer: packsReducer,
    cardsReducer: cardsReducer
})


export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})


export type AppRootStateType = ReturnType<typeof rootReducers>

export type AppTaskType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, any>