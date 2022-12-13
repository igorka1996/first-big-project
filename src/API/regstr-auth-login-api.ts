import axios from "axios";
// 'https://neko-back.herokuapp.com/2.0/'
// 'http://localhost:7542/2.0/'
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})
export type Data = {
    email: string,
    password: string
}
export type DataLogin = {
    email: string
    password: string
    rememberMe: boolean
}
type ResponseRegistrationType = {
    addedUser?: {
        created: string
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        updated: string
        verified: boolean
        __v: number
        _id: string
        error?: string
    }

}
type ResponseLoginType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    avatar?: string;
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
    error?: string
}

export const registrationAuthLoginAPI = {
    registration(data: Data) {
        return instance.post<ResponseRegistrationType>('auth/register', data)
    },
    login(data: DataLogin) {
        return instance.post<ResponseLoginType>('auth/login', data)
    },
    auth() {
        return instance.post<ResponseLoginType>('auth/me')
    },
    logOut() {
        return instance.delete('auth/me')
    },
    name(name: string) {
        return instance.put('auth/me', {name})
    },
    packs(pageCount?: number, page?: number, sort?: string, min?: number, max?: number, id?: string, search?: string) {
        return instance.get(`cards/pack?pageCount=${pageCount}&page=${page}&sortPacks=${sort}&min=${min}&max=${max}&packName=${search}&user_id=${id}`)
    },
    cards(pageCount?: number, page?: number, sort?: string, min?: number, max?: number, id: string = '', searchQ?: string, searchA?: string) {
        return instance.get(`cards/card?pageCount=${pageCount}&page=${page}&sortCards=${sort}&min=${min}&max=${max}&cardAnswer=${searchA}&cardsPack_id=${id}&cardQuestion=${searchQ}`)
    },
    newPacks() {
        return instance.post('cards/pack', {
            cardsPack: {
                name: "no Name",
                deckCover: "url or base64",
                private: false
            }
        })
    },
    newCard(id: string) {
        return instance.post('cards/card', {
            card: {
                cardsPack_id: id,
                question: "no question",
                answer: "no answer",
                grade: 0,
                shots: 0,
                answerImg: "url or base 64",
                questionImg: "url or base 64",
                questionVideo: "url or base 64",
                answerVideo: "url or base 64",
            }
        })
    },
    deletePacks(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
    },
    forgot(email: string) {
        const promise = instance.post('auth/forgot', {
            email: email, from: "test-front-admin <ai73a@yandex.by>", message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
https://igorka1996.github.io/first-big-project/forgot/set-new-password/327b1e60-6b3d-11ed-9bc3-29dc263e16ab
<a href='https://igorka1996.github.io/first-big-project#/forgot/set-new-password/$token$'>
link</a>
</div>`
        })
        return promise
    },
    newPass(password: string, token: string) {
        const promise = instance.post('auth/set-new-password', {password: password, resetPasswordToken: token})
        return promise
    }
}