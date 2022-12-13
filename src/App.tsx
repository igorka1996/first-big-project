import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/Header";
import SimplePaper from "./components/CardLogin";
import {Route, Routes} from "react-router-dom";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {LineProgressBar} from "./features/LineProgressBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store-reducers/store";
import {StatusType} from "./store-reducers/error-reducer";
import {authTC} from "./store-reducers/error-reducer";
import {ForgotPassword} from "./components/ForgotPassword";
import {CheckEmail} from "./components/CheckEmail";
import {CreatePassword} from "./components/CreatePassword";
import {PersonalInfo} from "./components/PersonalInfo";
import {CircularProgress} from "@mui/material";
import {AllPacks} from "./components/AllPacks";
import {Cards} from "./components/Cards";

export function App() {
    const LineProgress = useSelector<AppRootStateType, StatusType>(state => state.errorReducer.status)
    const initialize = useSelector<AppRootStateType, boolean>(state => state.errorReducer.initialize)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authTC() as any)
    }, [dispatch])

    if (!initialize) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className={'App'}>
            <Header/>
            {LineProgress === 'loading' ? <LineProgressBar/> : null}
            <Routes>
                <Route path={'/'} element={<AllPacks/>}/>
                <Route path={'/signin'} element={<SimplePaper/>}/>
                <Route path={'/forgot'}>
                    <Route index element={<ForgotPassword/>}/>
                    <Route path={'set-new-password/:token'} element={<CreatePassword/>}/>
                </Route>
                <Route path={'/checkemail'} element={<CheckEmail/>}/>
                <Route path={'/personalinfo'} element={<PersonalInfo/>}/>
                <Route path={'/cards'} element={<Cards/>}/>
            </Routes>
            <ErrorSnackbar/>
        </div>
    )
}
