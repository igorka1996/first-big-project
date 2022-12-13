import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {Data, DataLogin, registrationAuthLoginAPI} from "../API/regstr-auth-login-api";
import {errorAC, statusAC} from "./error-reducer";
import axios from "axios";


export type InitialStateType = {
    registration: boolean,
    auth: boolean,
    img: string,
    name: string,
    email: undefined | string,
    newPass: boolean
    id: string
}

const initialState: InitialStateType = {
    registration: false,
    auth: false,
    img: 'https://a.d-cd.net/OLn9cEYLYEkeQwmAwA_IyKhglqk-960.jpg',
    name: '',
    email: undefined,
    newPass: false,
    id: ''
}


const slice = createSlice({
    name: 'registration-auth-login',
    initialState,
    reducers: {
        registration(state, action: PayloadAction<{ value: boolean }>) {
            state.registration = action.payload.value
        },
        loginAC(state, action: PayloadAction<{ value: boolean, name: string, avatar: string, id: string }>) {
            state.auth = action.payload.value
            state.name = action.payload.name
            state.img = action.payload.avatar
            state.id = action.payload.id
        },
        authAC(state, action: PayloadAction<{ value: boolean, name: string, email: string, id: string }>) {
            state.auth = action.payload.value
            state.name = action.payload.name
            state.email = action.payload.email
            state.id = action.payload.id
        },
        logOutAC(state, action: PayloadAction<{ logOut: boolean }>) {
            state.auth = action.payload.logOut
            state.img = 'https://a.d-cd.net/OLn9cEYLYEkeQwmAwA_IyKhglqk-960.jpg'
            state.name = ''
        },
        avatarAC(state, action: PayloadAction<{ img: string }>) {
            state.img = action.payload.img
        },
        newPassAC(state, action: PayloadAction<{ pass: boolean }>) {
            state.newPass = action.payload.pass
        },
        nameAC(state, action: PayloadAction<{ name: string }>) {
            state.name = action.payload.name
        }
    }
})
export const {registration, loginAC, authAC, logOutAC, avatarAC, newPassAC, nameAC} = slice.actions
export const registrationAuthLoginReducer = slice.reducer

export const registrationTC = (data: Data) => async (dispatch: Dispatch) => {
    try {
        dispatch(statusAC({status: "loading"}))
        await registrationAuthLoginAPI.registration(data)
        dispatch(registration({value: true}))
        dispatch(statusAC({status: "success"}))
        return true
    } catch (e) {
        const err = e as Error
        if (axios.isAxiosError(e)) {
            dispatch(errorAC({error: e.response ? e.response.data.error : e.message}))
            dispatch(statusAC({status: "idle"}))
        } else if (err) {
            dispatch(errorAC({error: err.message}))
            dispatch(statusAC({status: "idle"}))
        }
    }
}


export const loginTC = (data: DataLogin) => async (dispatch: Dispatch) => {
    try {
        dispatch(statusAC({status: "loading"}))
        let response = await registrationAuthLoginAPI.login(data)
        dispatch(loginAC({
            value: true,
            name: response.data.name,
            avatar: response.data.avatar ? response.data.avatar : 'https://a.d-cd.net/OLn9cEYLYEkeQwmAwA_IyKhglqk-960.jpg',
            id: response.data._id
        }))
        dispatch(statusAC({status: "success"}))
    } catch (e) {
        const err = e as Error
        if (axios.isAxiosError(e)) {
            dispatch(errorAC({error: e.response ? e.response.data.error : e.message}))
            dispatch(statusAC({status: "idle"}))
        } else if (err) {
            dispatch(errorAC({error: err.message}))
            dispatch(statusAC({status: "idle"}))
        }
    }
}


export const logOutTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(statusAC({status: "loading"}))
        let response = await registrationAuthLoginAPI.logOut()
        if (response.data.info) {
            dispatch(logOutAC({logOut: false}))
            dispatch(statusAC({status: "success"}))
        }
    } catch (e) {
        const err = e as Error
        if (axios.isAxiosError(e)) {
            dispatch(errorAC({error: e.response ? e.response.data.error : e.message}))
            dispatch(statusAC({status: "idle"}))
        } else if (err) {
            dispatch(errorAC({error: err.message}))
            dispatch(statusAC({status: "idle"}))
        }
    }
}


export const forgotTC = (email: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(statusAC({status: "loading"}))
        let response = await registrationAuthLoginAPI.forgot(email)
        console.log(response.data.info)
        dispatch(statusAC({status: "success"}))
        return true
    } catch (e) {
        const err = e as Error
        if (axios.isAxiosError(e)) {
            dispatch(errorAC({error: e.response ? e.response.data.error : e.message}))
            dispatch(statusAC({status: "idle"}))
        } else if (err) {
            dispatch(errorAC({error: err.message}))
            dispatch(statusAC({status: "idle"}))
        }
    }
}


export const newPassTC = (pass: string, token: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(statusAC({status: "loading"}))
        await registrationAuthLoginAPI.newPass(pass, token)
        dispatch(newPassAC({pass: true}))
        dispatch(statusAC({status: "success"}))
        return true
    } catch (e) {
        const err = e as Error
        if (axios.isAxiosError(e)) {
            dispatch(errorAC({error: e.response ? e.response.data.error : e.message}))
            dispatch(statusAC({status: "idle"}))
        } else if (err) {
            dispatch(errorAC({error: err.message}))
            dispatch(statusAC({status: "idle"}))
        }
    }
}


export const nameTC = (name: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(statusAC({status: "loading"}))
        const res = await registrationAuthLoginAPI.name(name)
        dispatch(nameAC({name: res.data.updatedUser.name}))
        dispatch(statusAC({status: "success"}))
    } catch (e) {
        const err = e as Error
        if (axios.isAxiosError(e)) {
            dispatch(errorAC({error: e.response ? e.response.data.error : e.message}))
            dispatch(statusAC({status: "idle"}))
        } else if (err) {
            dispatch(errorAC({error: err.message}))
            dispatch(statusAC({status: "idle"}))
        }
    }
}