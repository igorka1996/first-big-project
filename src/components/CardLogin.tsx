import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import s from "./CardLogin.module.css"
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {NavLink,} from "react-router-dom";
import {useFormik} from "formik";
import {useState} from "react";
import {loginTC, registrationTC} from "../store-reducers/registr-login-auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store-reducers/store";
import {Navigate} from "react-router-dom";



export default function BasicCard() {
    const auth = useSelector<AppRootStateType, boolean>(state => state.registrationAuthLoginReducer.auth)
    const dispatch = useDispatch()

    interface State {
        showPassword: boolean;
    }

    const [up, setUp] = useState(false)
    const changeInAndUp = () => {
        setUp(!up)
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
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
        confirmPassword?: string
    }


    interface FormikType {
        email: string
        password: string
        rememberMe: boolean
        confirmPassword?: string
    }

    const initialValues: FormikType = {
        email: '',
        password: '',
        rememberMe: false,
        confirmPassword: ''
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
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = 'Invalid password'
            }
            if (up && !values.confirmPassword) {
                errors.confirmPassword = 'Required'
            } else if (up && values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match'
            }
            return errors
        },
        onSubmit: values => {
            if (up) {
                dispatch(registrationTC({email: values.email, password: values.password}) as any)
                    .then((e: boolean) => {
                        if (e) {
                            setUp(false)
                            formik.resetForm()
                        }
                    })
            } else {
                dispatch(loginTC({
                    email: values.email,
                    password: values.password,
                    rememberMe: values.rememberMe
                }) as any)
                    .then(() => {
                        if (auth) {
                            formik.resetForm()
                        }
                    })
            }

        },
    })

    if (auth) {
        return <Navigate to={'/'}/>
    }


    return (
        <Card className={s.card} sx={{minWidth: 275, maxWidth: 413}}>
            {up ? <h1>Sign up</h1> : <h1>Sign in</h1>}
            <form onSubmit={formik.handleSubmit} className={s.cardForm}>
                <CardContent className={s.form}>
                    <TextField onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}
                               name={'email'} className={s.inp} sx={{m: 2}} id="standard-basic" label="Email"
                               variant="standard"/>
                    {formik.touched.email && formik.errors.email ?
                        <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
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
                    {formik.touched.password && formik.errors.password ?
                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null}


                    {up ? (<FormControl className={s.inp} sx={{m: 2}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
                        <Input onBlur={formik.handleBlur}
                               onChange={formik.handleChange}
                               value={formik.values.confirmPassword ? formik.values.confirmPassword : ''}
                               name={'confirmPassword'}
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
                    </FormControl>) : undefined}
                    {up ? formik.touched.confirmPassword && formik.errors.confirmPassword ?
                        <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null : undefined}
                    {up ? undefined : <div className={s.check}>
                        <FormControlLabel className={s.checked}
                                          label="Remember me"
                                          control={<Checkbox value={formik.values.rememberMe} name={'rememberMe'}
                                                             onChange={formik.handleChange}/>}
                        /></div>}
                </CardContent>
                <CardActions className={s.forgot}>
                    {up ? undefined : <NavLink className={s.decor} to={'/forgot'}>Forgot Password?</NavLink>}
                    {up ? <Button type={'submit'} sx={{minWidth: 275}} size={"large"} variant="contained">Sign
                        up</Button> : <Button type={'submit'} sx={{minWidth: 275}} size={"large"} variant="contained">Sign
                        in</Button>}
                    <NavLink className={s.already} to={'/ddd'}>Already have an account?</NavLink>
                    {up ? <Button onClick={changeInAndUp}>Sign In</Button> :
                        <Button onClick={changeInAndUp}>Sign Up</Button>}
                </CardActions>
            </form>
        </Card>
    );
}