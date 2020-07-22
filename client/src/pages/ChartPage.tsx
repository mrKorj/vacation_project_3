import React, {useContext, useEffect} from 'react';
import {appContext} from "../App";
import {Redirect} from 'react-router-dom'
import {NavBar} from "../components/NavBar";
import {Chart} from "../components/Chart";
import {Footer} from "../components/Footer";

export const ChartPage = () => {
    const {state} = useContext(appContext)

    useEffect(() => {
        state.theme === 'light'
            ? document.body.style.backgroundColor = "#f5f5f5"
            : document.body.style.backgroundColor = "#2c2c54"
    }, [state.theme])

    if (!state.isLogged) {
        return <Redirect to={'/'}/>
    }

    return (
        <div>
            <div className='container con'>
                <NavBar/>
                <div className='mt-7 mb-5'>
                    <h2 className={`${state.theme === 'light' ? 'text-dark' : 'text-light'} mb-3`}>Followers Chart</h2>
                    <Chart/>
                </div>
            </div>
            <Footer toTop={false}/>
        </div>
    );
};
