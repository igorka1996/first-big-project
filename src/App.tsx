import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "./components/Header";
import SimplePaper from "./components/CardLogin";
import {Route, Routes} from "react-router-dom";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {LineProgressBar} from "./components/LineProgressBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store-reducers/store";
import {StatusType} from "./store-reducers/error-reducer";
import {authTC} from "./store-reducers/error-reducer";
import {Osnova} from "./components/Osnova";
import {ForgotPassword} from "./components/ForgotPassword";
import {CheckEmail} from "./components/CheckEmail";
import {CreatePassword} from "./components/CreatePassword";
import {PersonalInfo} from "./components/PersonalInfo";
import {CircularProgress} from "@mui/material";

function App() {
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

    console.log('Privet')

    return (
        <div className={'App'}>
            <ButtonAppBar/>
            {LineProgress === 'loading' ? <LineProgressBar/> : null}
            <Routes>
                <Route path={'/'} element={<Osnova/>}/>
                <Route path={'/signin'} element={<SimplePaper up={false}/>}/>
                <Route path={'/forgot'} element={<ForgotPassword/>}/>
                <Route path={'/checkemail'} element={<CheckEmail/>}/>
                <Route path={'/forgot/set-new-password/:token'} element={<CreatePassword/>}/>
                <Route path={'/personalinfo'} element={<PersonalInfo/>}/>
            </Routes>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;