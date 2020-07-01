import React, {useContext} from 'react';
import {appContext} from "../App";
import {Redirect} from 'react-router-dom'
import {NavBar} from "../components/NavBar";
import {Chart} from "../components/Chart";

export const ChartPage = () => {
    const {state} = useContext(appContext)

    if (!state.isLogged) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className='container'>
            <NavBar/>
            <div className='mt-7'>
                <h1>Chart Page</h1>
                <Chart/>
            </div>
        </div>
    );
};
