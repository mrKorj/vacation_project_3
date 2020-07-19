import React, {createContext, useEffect, useReducer} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ActionType, initialState, IState, reducer} from "./reducers/reducer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ContactsPage} from "./pages/ContactsPage";
import {LogInPage} from "./pages/LogInPage";
import {RegisterPage} from "./pages/RegisterPage";
import {PrivetRoute} from "./PrivetRoute";
import {AboutPage} from "./pages/AboutPage";
import {AuthenticationAction} from "./reducers/authActions";
import {getVacationsAction} from "./reducers/appActions";
import {ChartPage} from "./pages/ChartPage";
import io from 'socket.io-client'

const socket = io('http://192.168.1.163:4000')


export const appContext = createContext<{ state: IState, dispatch: React.Dispatch<any> }>({
    state: initialState,
    dispatch: () => null
})

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        AuthenticationAction(dispatch)
    }, [dispatch])

    useEffect(() => {
        if (state.isLogged) {
            getVacationsAction(dispatch)

            socket.on('followActionClient', (data: any) => {
                dispatch({
                    type: ActionType.GetCountFollowers,
                    payload: data
                })
            })

            socket.on('editVacation', (editedVacation: any) => {
                dispatch({
                    type: ActionType.EditVacation,
                    payload: editedVacation
                })
            })

            socket.on('addNewVacation', (newVacation: any) => {
                dispatch({
                    type: ActionType.AddVacation,
                    payload: newVacation
                })
            })

            socket.on('likeActionClient', (vacationId: any) => {
                dispatch({
                    type: ActionType.Like,
                    payload: vacationId
                })
            })

            socket.on('deleteAction', (vacationId: any) => {
                dispatch({
                    type: ActionType.DeleteVacation,
                    payload: vacationId
                })
            })

            if (state.userRole === 'admin') {
                socket.emit('adminSocketId', socket.id)
            }
        }
    }, [state.userRole, state.isLogged])

    return (
        <appContext.Provider value={{state, dispatch}}>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={PrivetRoute}/>
                    <Route path='/about' exact component={AboutPage}/>
                    <Route path='/contacts' exact component={ContactsPage}/>
                    <Route path='/chart' exact component={ChartPage}/>
                    <Route path='/login' exact component={LogInPage}/>
                    <Route path='/register' exact component={RegisterPage}/>
                </Switch>
            </BrowserRouter>
        </appContext.Provider>
    );
}

export default App;
