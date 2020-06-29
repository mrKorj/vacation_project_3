import React, {useContext, useState} from 'react';
import {appContext} from "../App";
import {LogOutAction} from "../reducers/authActions";
import {FormModal} from "./FormModal";

export const NavBar = () => {
    const {state, dispatch} = useContext(appContext)
    const [modalShow, setModalShow] = useState(false)


    const logoutHandler = () => {
        LogOutAction(dispatch)
    }

    const addVacationHandler = () => {
        setModalShow(true)
    }

    return (
        <div>
            <nav className="mb-1 navbar navbar-expand-lg navbar-light bg-nav fixed-top">
                <div className="container">
                    <img src="/img/vacation2.png" className="navbar-brand" height="50" alt="logo"/>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </li>

                            {
                                state.userRole === 'admin'
                                    ? (
                                        <>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">Activity charts</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#"
                                                   onClick={addVacationHandler}>Add vacation</a>
                                            </li>
                                        </>
                                    )
                                    : null
                            }

                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>

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
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <FormModal show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
    );
};
