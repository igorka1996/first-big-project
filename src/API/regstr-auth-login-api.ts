import axios from "axios";

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
        const promise = instance.post<ResponseRegistrationType>('auth/register', data)
        return promise
    },
    login(data: DataLogin) {
        const promise = instance.post<ResponseLoginType>('auth/login', data)
        return promise
    },
    auth() {
        const promise = instance.post<ResponseLoginType>('auth/me')
        return promise
    },
    logOut() {
        const promise = instance.delete('auth/me')
        return promise
    },
    forgot(email: string) {
        const promise = instance.post('auth/forgot', {
            email: email, from: "test-front-admin <ai73a@yandex.by>", message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='https://igorka1996.github.io/forgot/set-new-password/$token$'>
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