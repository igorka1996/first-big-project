import React, {ChangeEvent, useState} from 'react';
import Card from "@mui/material/Card";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store-reducers/store";
import s from './PersonalInfo.module.css'
import fotik from '../IMG/setfoto.png'
import pen from '../IMG/Edit.png'
import {Button, Input} from "@mui/material";
import logout from '../IMG/logout.png'
import {logOutTC, nameTC} from "../store-reducers/registr-login-auth-reducer";
import {Navigate, NavLink} from "react-router-dom";
import {errorAC} from "../store-reducers/error-reducer";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

export const PersonalInfo = () => {
    const auth = useSelector<AppRootStateType, boolean>(state => state.registrationAuthLoginReducer.auth)
    const avatar = useSelector<AppRootStateType, string>(state => state.registrationAuthLoginReducer.img)
    const name = useSelector<AppRootStateType, string>(state => state.registrationAuthLoginReducer.name)
    const email = useSelector<AppRootStateType, string | undefined>(state => state.registrationAuthLoginReducer.email)

    const [statName, setStatName] = useState(name)
    const [changeInput, setChangeInput] = useState(false)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStatName(e.currentTarget.value)
    }

    const HandleChangeName = () => {
        if (statName.length > 20) {
            return dispatch(errorAC({error: 'Your name cannot be more than 20 characters'}))
        } else if (statName.length < 1) {
            return dispatch(errorAC({error: 'Your name cannot be less than 1 character'}))
        }
        dispatch(nameTC(statName) as any)
        setChangeInput(false)
    }

    const dispatch = useDispatch()
    if (!auth) {
        return <Navigate to='/signin'/>
    }
    return (
        <div>
            <NavLink className={s.back} to='/'><ArrowCircleLeftOutlinedIcon/> <span>Back to Packs List</span></NavLink>
            <Card className={s.card} sx={{minWidth: 275, maxWidth: 413}}>
                <h1>Personal Information</h1>
                <div className={s.fotograph}><img className={s.img} src={avatar} alt=""/><img
                    className={s.imgFotik}
                    src={fotik} alt=""/></div>
                {!changeInput
                    ? <div className={s.name}><h3 onDoubleClick={() => setChangeInput(true)}>{name}</h3><img
                        onClick={() => setChangeInput(true)} className={s.pen}
                        src={pen} alt=""/></div>
                    : <Input value={statName} autoFocus onChange={onChangeInput} onBlur={HandleChangeName}/>}
                <span className={s.email}>{email}</span>
                <Button onClick={() => dispatch(logOutTC() as any)} color={"inherit"} variant="contained"><img
                    src={logout} alt=""/> Log out</Button>
            </Card>
        </div>
    );
};
