import React, {useContext} from 'react';
import {NavBar} from "../components/NavBar";
import {Redirect} from "react-router-dom";
import {appContext} from "../App";

export const AboutPage = () => {
    const {state} = useContext(appContext)

    if (!state.isLogged) {
        return <Redirect to='login'/>
    }

    return (
        <div className="container">
            <NavBar/>
            <div className="jumbotron jumbotron-fluid mt-7">
                <div className="container">
                    <h1 className="display-4">About Page</h1>
                    <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti fugiat in perferendis qui quod recusandae ut vel! Dicta, libero!</p>
                </div>
            </div>
        </div>
    );
};
