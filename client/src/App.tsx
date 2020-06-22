import React, {createContext, useEffect, useMemo, useReducer} from 'react';
import {ActionType, initialState, IState, reducer} from "./reducers/reduser";
import {getToken} from "./token";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {LogInPage} from "./pages/logInPage";
import {MainPage} from "./pages/mainPage";
import {AdminPage} from "./pages/adminPage";
import {RegisterPage} from "./pages/registerPage";


export const appContext = createContext<{ state: IState, dispatch: React.Dispatch<any>}>({state: initialState, dispatch: () => null})

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    const token = useMemo(()=> {
        return getToken()
    }, [])

    useEffect(()=> {
        if (token) {
            dispatch({
                type: ActionType.LogIn
            });
        }
    }, [dispatch, token])

    return (
        <appContext.Provider value={{state, dispatch}}>
            <BrowserRouter>
                <div className="container">
                    <Switch>
                        <Route exact path='/'>
                            {() => {
                                if (state.isLogged) {
                                    return <MainPage/>
                                }
                                return <Redirect to={'/login'}/>
                            }}
                        </Route>
                        <Route path='/admin' component={AdminPage}/>
                        <Route path='/login' component={LogInPage}/>
                        <Route path='/register' component={RegisterPage}/>

                    </Switch>
                </div>
            </BrowserRouter>
        </appContext.Provider>
    );
}

export default App;
