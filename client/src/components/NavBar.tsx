import React, {useContext, useState} from 'react';
import {appContext} from "../App";
import {LogOutAction} from "../reducers/authActions";
import {AddForm} from "./AddForm";
import {NavLink} from "react-router-dom";
import {ChangeThemeAction} from "../reducers/appActions";
import {Message} from "./Message";

export const NavBar = () => {
    const {state, dispatch} = useContext(appContext)
    const [modalShow, setModalShow] = useState(false)

    const themeHandler = () => {
        ChangeThemeAction(dispatch)
    }

    const logoutHandler = () => {
        LogOutAction(dispatch)
    }

    const addVacationHandler = () => {
        setModalShow(true)
    }

    return (
        <div>
            <nav
                className={`mb-1 navbar navbar-expand-lg fixed-top ${state.theme === 'light' ? 'navbar-light bg-nav' : 'navbar-dark bg-nav-dark'}`}>
                <div className="container">
                    <img src="/img/vacation2.png" className="navbar-brand" height="50" alt="logo"/>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/'} exact>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/about'}>About</NavLink>
                            </li>
                            {
                                state.userRole === 'admin'
                                    ? (
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/chart">Activity charts</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <button className="mt-1-5 btn btn-outline-info btn-sm"
                                                        onClick={addVacationHandler}>Add vacation
                                                </button>
                                            </li>
                                        </>
                                    )
                                    : null
                            }
                        </ul>

                        {state.message ? <Message/> : null}

                        <ul className="navbar-nav ml-auto nav-flex-icons">
                            <li className="nav-item">
                                <a className="nav-link waves-effect waves-light">
                                    <i className="fab fa-twitter"/>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link waves-effect waves-light">
                                    <i className="fab fa-google-plus-g"/>
                                </a>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link waves-effect waves-light">
                                    Welcome <strong>{state.userName}</strong>
                                </span>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="DropdownMenuLink"
                                   data-toggle="dropdown"
                                   aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user"/>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-default"
                                     aria-labelledby="DropdownMenuLink">
                                    <a className="dropdown-item" href="#" onClick={logoutHandler}>Log Out</a>
                                    <a className="dropdown-item" href="#"
                                       onClick={themeHandler}>{state.theme === 'light' ? 'Dark Theme' : 'Light Theme'}</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <AddForm show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
    );
};
