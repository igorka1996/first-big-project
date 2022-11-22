import React from 'react';
import Card from "@mui/material/Card";
import s from "./CardLogin.module.css";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import mail from '../IMG/mail.png'
import {NavLink} from "react-router-dom";

export const CheckEmail = () => {
    return (
        <Card className={s.card} sx={{minWidth: 275, maxWidth: 413}}>
            <h1>Check Email</h1>
            <CardContent className={s.form}>
                <div><img src={mail} alt=""/></div>
                <span className={s.instruction}>We’ve sent an Email with instructions to example@mail.com </span>
            </CardContent>
            <CardActions className={s.forgot}>
                <NavLink style={{textDecoration: "none"}} to={'/signin'}>
                    <Button  type={'submit'} sx={{minWidth: 275}} size={"large"} variant="contained">Back to
                        login</Button>
                </NavLink>
            </CardActions>
        </Card>
    );
};

