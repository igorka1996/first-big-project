import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {initialAC, statusAC} from "./error-reducer";
import {registrationAuthLoginAPI} from "../API/regstr-auth-login-api";
import {AppTaskType} from "./store";

export type PacksType = {
    created: string
    deckCover?: string
    grade?: number
    more_id?: string
    path?: string
    private?: boolean
    rating?: number
    shots?: number
    type?: string
    user_id: string
    __v?: number
    _id: string
    user_name: string
    cardsCount: number
    updated: string
    name: string
}

export type RespType = {
    cardPacks: PacksType[],
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
    sort: string
    search: string
    id: string
}

const initialState: RespType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 110,
    minCardsCount: 0,
    page: 0,
    pageCount: 10,
    token: '',
    tokenDeathTime: 0,
    sort: '0updated',
    search: '',
    id: ''
}


const slice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        getPacksAC(state, action: PayloadAction<{ pack: RespType }>) {
            state.cardPacks = action.payload.pack.cardPacks.map(el => ({...el}))
            state.cardPacksTotalCount = action.payload.pack.cardPacksTotalCount
            state.pageCount = action.payload.pack.pageCount
            state.token = action.payload.pack.token
            state.tokenDeathTime = action.payload.pack.tokenDeathTime
        },
        pageCountPacksAC(state, action: PayloadAction<{ pageCount: number }>) {
            state.pageCount = action.payload.pageCount
        },
        pagePacksAC(state, action: PayloadAction<{ page: number }>) {
            state.page = action.payload.page
        },
        minMaxPacksAC(state, action: PayloadAction<{ min: number, max: number }>) {
            state.minCardsCount = action.payload.min
            state.maxCardsCount = action.payload.max
            state.page = 0
        },
        sortPacksAC(state, action: PayloadAction<{ sort: string }>) {
            state.sort = action.payload.sort
        },
        searchPacksAC(state, action: PayloadAction<{ text: string }>) {
            state.search = action.payload.text
        },
        idPacksAC(state, action: PayloadAction<{ id: string }>) {
            state.id = action.payload.id
        }
    }
})

export const packsReducer = slice.reducer


export const {getPacksAC, pageCountPacksAC, minMaxPacksAC, sortPacksAC, searchPacksAC, pagePacksAC, idPacksAC} = slice.actions

export const getPacksTC = (): AppTaskType => async (dispatch, getState) => {
    const {pageCount, page, maxCardsCount, minCardsCount, sort, search, id} = getState().packsReducer
    try {
        dispatch(statusAC({status: "loading"}))
        const res = await registrationAuthLoginAPI.packs(pageCount, page, sort, minCardsCount, maxCardsCount, id, search)
        dispatch(getPacksAC({pack: res.data}))
        dispatch(statusAC({status: "success"}))
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




export const newPacksTC = (): AppTaskType => async (dispatch) => {
    try {
        dispatch(statusAC({status: "loading"}))
        await registrationAuthLoginAPI.newPacks()
        dispatch(getPacksTC())
        dispatch(statusAC({status: "success"}))
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



export const deletePacksTC = (id: string): AppTaskType => async (dispatch) => {
    try {
        dispatch(statusAC({status: "loading"}))
        await registrationAuthLoginAPI.deletePacks(id)
        dispatch(getPacksTC())
        dispatch(statusAC({status: "success"}))
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