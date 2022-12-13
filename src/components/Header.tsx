import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Button} from "@mui/material";
import itinc from "../IMG/itinc.png"
import s from "./Header.module.css"
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store-reducers/store";
import {MenuProfile} from "../features/MenuProfile";


export function Header() {
    const auth = useSelector<AppRootStateType, boolean>(state => state.registrationAuthLoginReducer.auth)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar color={"inherit"} position="static">
                <Toolbar className={s.flHeader}>
                    <img src={itinc} alt="it-incubator"/>
                    {auth ?
                        <MenuProfile/>
                        : <NavLink style={{textDecoration: "none"}} to={'/signin'}><Button variant="contained">Sign
                            in</Button></NavLink>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}