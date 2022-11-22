import React from 'react';
import Card from "@mui/material/Card";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store-reducers/store";
import s from './PersonalInfo.module.css'
import fotik from '../IMG/setfoto.png'
import pen from '../IMG/Edit.png'
import {Button} from "@mui/material";
import logout from '../IMG/logout.png'
import {logOutTC} from "../store-reducers/registr-login-auth-reducer";
import {Navigate} from "react-router-dom";

export const PersonalInfo = () => {
    const auth = useSelector<AppRootStateType, boolean>(state => state.registrationAuthLoginReducer.auth)
    const avatar = useSelector<AppRootStateType, string>(state => state.registrationAuthLoginReducer.img)
    const name = useSelector<AppRootStateType, string | undefined>(state => state.registrationAuthLoginReducer.name)
    const email = useSelector<AppRootStateType, string | undefined>(state => state.registrationAuthLoginReducer.email)
    const dispatch = useDispatch()
    if (!auth) {
        return <Navigate to='/signin'/>
    }
    return (
        <div>
            <Card className={s.card} sx={{minWidth: 275, maxWidth: 413}}>
                <h1>Personal Information</h1>
                <div className={s.fotograph}><img className={s.img} src={avatar} alt=""/><img className={s.imgFotik}
                                                                                              src={fotik} alt=""/></div>
                <div className={s.name}><h3>{name}</h3><img className={s.pen} src={pen} alt=""/></div>
                <span className={s.email}>{email}</span>
                <Button onClick={() => dispatch(logOutTC() as any)} color={"inherit"} variant="contained"><img
                    src={logout} alt=""/> Log out</Button>
            </Card>
        </div>
    );
};
