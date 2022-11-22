import React, {useState} from 'react';
import {useFormik} from "formik";
import Card from "@mui/material/Card";
import s from "./CardLogin.module.css";
import CardContent from "@mui/material/CardContent";
import {TextField} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import {Navigate, NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import {forgotTC} from "../store-reducers/registr-login-auth-reducer";
import {useDispatch} from "react-redux";

export const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [check, setCheck] = useState(false)
    type FormikErrorType = {
        email?: string
    }

    interface FormikType {
        email: string
    }

    const initialValues: FormikType = {
        email: ''
    }


    const formik = useFormik({
        initialValues,
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(forgotTC(values.email) as any)
                .then((e: boolean) => {
                    if (e) {
                        formik.resetForm()
                        setCheck(!check)
                    }
                })
        },
    })

    if (check) {
        return <Navigate to='/checkemail'/>
    }

    return (
        <Card className={s.card} sx={{minWidth: 275, maxWidth: 413}}>
            <h1>Forgot your password?</h1>
            <form onSubmit={formik.handleSubmit} className={s.cardForm}>
                <CardContent className={s.form}>
                    <TextField onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}
                               name={'email'} className={s.inp} sx={{m: 2}} id="standard-basic" label="Email"
                               variant="standard"/>
                    {formik.touched.email && formik.errors.email ?
                        <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    <span
                        className={s.instruction}>Enter your email address and we will send you further instructions </span>
                </CardContent>
                <CardActions className={s.forgot}>
                    <Button type={'submit'} sx={{minWidth: 275}} size={"large"} variant="contained">Send
                        Instructions</Button>
                    <NavLink className={s.already} to={'/ddd'}>Did you remember your password?</NavLink>
                    <Button>Try logging in</Button>
                </CardActions>
            </form>
        </Card>
    );
};
