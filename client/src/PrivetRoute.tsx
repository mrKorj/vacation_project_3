import React, {useContext, useEffect} from 'react';
import {Redirect, Route} from 'react-router-dom'
import {MainPage} from "./pages/mainPage";
import {AuthenticationAction} from "./reducers/authActions";
import {appContext} from "./App";
import {LogInPage} from "./pages/logInPage";

export const PrivetRoute: React.FC = () => {
    const {state, dispatch} = useContext(appContext)

    useEffect(() => {
        AuthenticationAction(dispatch)
    }, [dispatch])

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
