import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {registrationAuthLoginAPI} from "../API/regstr-auth-login-api";
import axios from "axios";
import {authAC, avatarAC} from "./registr-login-auth-reducer";


export type StatusType = 'idle' | 'loading' | 'success'


type InitialStateType = {
    error: undefined | string,
    status: StatusType,
    initialize: boolean,
    wait: boolean
}

const initialState: InitialStateType = {
    error: undefined,
    status: "idle",
    initialize: false,
    wait: false
}



const slice = createSlice({
    name: 'error-initialized-status',
    initialState,
    reducers: {
        errorAC(state, action: PayloadAction<{error: string | undefined}>){
            state.error = action.payload.error
        },
        statusAC(state, action: PayloadAction<{status: StatusType}>){
            state.status = action.payload.status
        },
        initialAC(state, action: PayloadAction<{initial: boolean}>){
            state.initialize = action.payload.initial
        },
        waitAC(state, action: PayloadAction<{wait: boolean}>){
            state.wait = action.payload.wait
        }
    }
})


export const {errorAC, statusAC, initialAC, waitAC} = slice.actions
export const errorReducer = slice.reducer


export const authTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(statusAC({status: "loading"}))
        let response = await registrationAuthLoginAPI.auth()
        if (response.status === 200) {
            dispatch(authAC({value: true, name: response.data.name, email: response.data.email, id: response.data._id}))
            dispatch(statusAC({status: "success"}))
            dispatch(initialAC({initial: true}))
            if (response.data.avatar) {
                dispatch(avatarAC({img: response.data.avatar}))
                dispatch(statusAC({status: "success"}))
                dispatch(initialAC({initial: true}))
            }
        }
    } catch (e) {
        const err = e as Error
        if (axios.isAxiosError(e)) {
            dispatch(statusAC({status: "success"}))
            dispatch(initialAC({initial: true}))
        } else if (err) {
            dispatch(statusAC({status: "success"}))
            dispatch(initialAC({initial: true}))
        }
    }
}