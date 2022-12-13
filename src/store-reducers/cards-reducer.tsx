import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppTaskType} from "./store";
import {initialAC, statusAC, waitAC} from "./error-reducer";
import {registrationAuthLoginAPI} from "../API/regstr-auth-login-api";
import axios from "axios";


export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type RespType = {
    cards: CardType[],
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    sort: string,
    searchQ: string,
    searchA: string,
    id: string
}

const initialState: RespType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 4,
    minGrade: 1,
    page: 0,
    pageCount: 10,
    packUserId: '',
    sort: '0grade',
    searchQ: '',
    searchA: '',
    id: '',
}


const slice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        getCardsAC(state, action: PayloadAction<{ cards: RespType }>) {
            state.cards = action.payload.cards.cards.map(el => ({...el}))
            state.cardsTotalCount = action.payload.cards.cardsTotalCount
            state.pageCount = action.payload.cards.pageCount
            state.maxGrade = action.payload.cards.maxGrade
            state.minGrade = action.payload.cards.minGrade
            state.packUserId = action.payload.cards.packUserId
        },
        pageCountCardsAC(state, action: PayloadAction<{ pageCount: number }>) {
            state.pageCount = action.payload.pageCount
        },
        pageCardsAC(state, action: PayloadAction<{ page: number }>) {
            state.page = action.payload.page
        },
        minMaxCardsAC(state, action: PayloadAction<{ min: number, max: number }>) {
            state.maxGrade = action.payload.min
            state.maxGrade = action.payload.max
        },
        sortCardsAC(state, action: PayloadAction<{ sort: string }>) {
            state.sort = action.payload.sort
        },
        searchQCardsAC(state, action: PayloadAction<{ text: string }>) {
            state.searchQ = action.payload.text
        },
        searchACardsAC(state, action: PayloadAction<{ text: string }>) {
            state.searchA = action.payload.text
        },
        idCardsAC(state, action: PayloadAction<{ id: string }>) {
            state.id = action.payload.id
        }
    }
})

export const cardsReducer = slice.reducer


export const {
    getCardsAC,
    pageCountCardsAC,
    pageCardsAC,
    minMaxCardsAC,
    sortCardsAC,
    searchQCardsAC,
    searchACardsAC,
    idCardsAC
} = slice.actions


export const getCardsTC = (): AppTaskType => async (dispatch, getState) => {
    const {pageCount, page, maxGrade, minGrade, sort, searchQ, searchA, id} = getState().cardsReducer
    try {
        dispatch(waitAC({wait: true}))
        dispatch(statusAC({status: "loading"}))
        const res = await registrationAuthLoginAPI.cards(pageCount, page, sort, minGrade, maxGrade, id, searchQ, searchA)
        dispatch(getCardsAC({cards: res.data}))
        dispatch(statusAC({status: "success"}))
        dispatch(waitAC({wait: false}))
    } catch (e) {
        const err = e as Error
        if (axios.isAxiosError(e)) {
            dispatch(statusAC({status: "success"}))
            dispatch(initialAC({initial: true}))
            dispatch(waitAC({wait: false}))
        } else if (err) {
            dispatch(statusAC({status: "success"}))
            dispatch(initialAC({initial: true}))
            dispatch(waitAC({wait: false}))
        }
    }
}


export const newCardTC = (): AppTaskType => async (dispatch, getState) => {
    const {id} = getState().cardsReducer
    try {
        dispatch(statusAC({status: "loading"}))
        await registrationAuthLoginAPI.newCard(id)
        dispatch(getCardsTC())
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


export const deleteCardTC = (id: string): AppTaskType => async (dispatch) => {
    try {
        dispatch(statusAC({status: "loading"}))
        await registrationAuthLoginAPI.deleteCard(id)
        dispatch(getCardsTC())
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