import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom'
import {MainPage} from "./pages/MainPage";
import {appContext} from "./App";
import {LogInPage} from "./pages/LogInPage";

export const PrivetRoute: React.FC = () => {
    const {state} = useContext(appContext)


    if (!state.isLogged) {
        return <Redirect to='login'/>
    }

    return (
        <Route>
            {() => {
                if (state.userRole === 'registeredUser' || state.userRole === 'admin') {
                    return <MainPage/>
                }
                return <LogInPage/>
            }}
        </Route>
    );
};
