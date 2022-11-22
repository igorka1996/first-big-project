import React from 'react';
import Card from "@mui/material/Card";
import s from "./CardLogin.module.css";
import CardContent from "@mui/material/CardContent";
import {FormControl, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {newPassTC} from "../store-reducers/registr-login-auth-reducer";
import {Navigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../store-reducers/store";

export const CreatePassword = () => {
    const dispatch = useDispatch()
    const newPass = useSelector<AppRootStateType, boolean>(state => state.registrationAuthLoginReducer.newPass)


    interface State {
        showPassword: boolean;
    }

    const [values, setValues] = React.useState<State>({
        showPassword: false
    })
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    interface FormikType {
        password: string
    }

    type FormikErrorType = {
        password?: string
    }
    const initialValues: FormikType = {
        password: ''
    }

    const token = useParams()


    const formik = useFormik({
        initialValues,
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = 'Invalid password'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(newPassTC(values.password, token.token ? token.token : '') as any)
            formik.resetForm()
        }
    })


    if (newPass) {
        return <Navigate to='/signin'/>
    }

    return (
        <Card className={s.card} sx={{minWidth: 275, maxWidth: 413}}>
            <h1>Create new password</h1>
            <form onSubmit={formik.handleSubmit} className={s.cardForm}>
                <CardContent className={s.form}>
                    <FormControl className={s.inp} sx={{m: 2}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input onBlur={formik.handleBlur}
                               onChange={formik.handleChange} value={formik.values.password} name={'password'}
                               id="standard-adornment-password"
                               type={values.showPassword ? 'text' : 'password'}
                               endAdornment={
                                   <InputAdornment position="end">
                                       <IconButton
                                           aria-label="toggle password visibility"
                                           onClick={handleClickShowPassword}
                                           onMouseDown={handleMouseDownPassword}
                                       >
                                           {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                       </IconButton>
                                   </InputAdornment>
                               }
                        />
                    </FormControl>
                    <span
                        className={s.instruction}>Create new password and we will send you further instructions to email</span>
                </CardContent>
                <CardActions className={s.forgot}>
                    <Button type={'submit'} sx={{minWidth: 275}} size={"large"} variant="contained">Create new
                        password</Button>
                </CardActions>
            </form>
        </Card>
    );
};

