import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import s from '../components/AllPacks.module.css'
import {minMaxPacksAC} from "../store-reducers/packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store-reducers/store";
import {StatusType} from "../store-reducers/error-reducer";

type PropsType = {
    value: number[]
    setValue: (num: number[]) => void
    setPage: (num: number) => void
}

export function Range(props: PropsType) {
    const status = useSelector<AppRootStateType, StatusType>(state => state.errorReducer.status)
    const dispatch = useDispatch()
    const HandleOnBlur = (newValue: number[]) => {
        dispatch(minMaxPacksAC({min: newValue[0], max: newValue[1]}))
        props.setPage(0)
    }
    const handleChange = (event: Event, newValue: number | number[]) => {
        props.setValue(newValue as number[]);
    };

    return (
        <Box className={s.box} sx={{width: 300}}>
            <span className={s.span}>{props.value[0]}</span>
            <Slider
                onMouseLeave={() => HandleOnBlur(props.value)}
                value={props.value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={110}
                disabled={status === 'loading'}
            />
            <span className={s.span}>{props.value[1]}</span>
        </Box>
    );
}