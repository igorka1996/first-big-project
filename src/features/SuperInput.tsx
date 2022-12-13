import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {InputAdornment} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent} from "react";
import {AppRootStateType} from "../store-reducers/store";
import {StatusType} from "../store-reducers/error-reducer";



type PropsType = {
    setPage: (num: number) => void
    search: (payload: {text: string}) => any
    txt: string
}

export function SuperInput(props: PropsType) {
    const status = useSelector<AppRootStateType, StatusType>(state => state.errorReducer.status)
    const dispatch = useDispatch()

    const debounce = (fn: any, ms: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        return function (this: any, ...args: any[]) {
            clearTimeout(timeout)
            timeout = setTimeout(() => fn.apply(this, args), ms)
        }
    }

    const debounced = debounce((value: string) => {
        dispatch(props.search({text: value}))
        props.setPage(0)
    }, 700)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        debounced(e.currentTarget.value)
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {m: 1, width: '40ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <TextField disabled={status === 'loading'} onChange={onChangeHandler} defaultValue={props.txt} style={{height: '50px'}} InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                )
            }} id="outlined-basic" label="Provide your text" variant="outlined"/>
        </Box>
    );
}