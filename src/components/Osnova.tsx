import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store-reducers/store";
import {Navigate} from "react-router-dom";
export const Osnova = () => {
    const auth = useSelector<AppRootStateType, boolean>(state => state.registrationAuthLoginReducer.auth)

    if(!auth){
        return <Navigate to={'/signin'}/>
    }
    return (
        <div>
            <h1>Privet</h1>
        </div>
    );
};

