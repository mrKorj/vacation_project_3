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
        <>
            <nav
                className={`mb-1 navbar navbar-expand-sm fixed-top ${state.theme === 'light' ? 'navbar-light bg-nav' : 'navbar-dark bg-nav-dark'}`}>
                <div className="container">
                    <img src="/img/vacation2.png" className="navbar-brand" height="50" alt="logo"/>

                    <button className="navbar-toggler toggler-example" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent1"
                            aria-controls="navbarSupportedContent1" aria-expanded="false"
                            aria-label="Toggle navigation"><span className="dark-blue-text">
                    <i className="fas fa-bars fa-1x"/></span></button>

                    <div className="container">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent1">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link font-weight-bold" to={'/'} exact>Home</NavLink>
                                </li>

                                {
                                    state.userRole === 'admin'
                                        ? (
                                            <>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link font-weight-bold" to="/chart">Followers
                                                        chart</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <button className="mt-1-5 btn btn-outline-info btn-sm font-weight-bold"
                                                            onClick={addVacationHandler}>Add vacation
                                                    </button>
                                                </li>
                                            </>
                                        )
                                        : <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link font-weight-bold"
                                                         to={'/contacts'}>Contacts</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link font-weight-bold" to={'/about'}>About</NavLink>
                                            </li>
                                        </>
                                }

                            </ul>

                            {state.message ? <Message/> : null}

                            <ul className="navbar-nav ml-auto nav-flex-icons">
                                <div className="d-inline-flex align-items-baseline justify-content-between">
                                    <li className="nav-item">
                                <span className="nav-link">
                                    Welcome <strong className='text-capitalize'>{state.userName}</strong>
                                </span>
                                    </li>
                                    <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" id="DropdownMenuLink"
                                      data-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false" role='button'>
                                     <i className="fas fa-user"/>
                                </span>
                                        <div className="dropdown-menu dropdown-menu-right dropdown-default"
                                             aria-labelledby="DropdownMenuLink">
                                        <span className="dropdown-item" role='button'
                                              onClick={logoutHandler}>Log Out</span>
                                            <span className="dropdown-item" role='button'
                                                  onClick={themeHandler}>
                                        {state.theme === 'light' ? 'Dark Theme' : 'Light Theme'}</span>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <AddForm show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    );
};
