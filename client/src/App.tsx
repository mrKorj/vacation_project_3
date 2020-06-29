import React, {createContext, useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {initialState, IState, reducer} from "./reducers/reducer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {LogInPage} from "./pages/logInPage";
import {RegisterPage} from "./pages/registerPage";
import {PrivetRoute} from "./PrivetRoute";


export const appContext = createContext<{ state: IState, dispatch: React.Dispatch<any> }>({
    state: initialState,
    dispatch: () => null
})

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <appContext.Provider value={{state, dispatch}}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={PrivetRoute}/>
                    <Route path='/login' exact component={LogInPage}/>
                    <Route path='/register' exact component={RegisterPage}/>
                </Switch>
            </BrowserRouter>
        </appContext.Provider>
    );
}

export default App;
