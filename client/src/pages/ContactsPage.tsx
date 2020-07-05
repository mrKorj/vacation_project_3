import React, {useContext, useEffect} from 'react';
import {appContext} from "../App";
import {Redirect} from "react-router-dom";
import {NavBar} from "../components/NavBar";
import {Footer} from "../components/Footer";

export const ContactsPage: React.FC = () => {
    const {state} = useContext(appContext)

    useEffect(() => {
        state.theme === 'light'
            ? document.body.style.backgroundColor = "#f5f5f5"
            : document.body.style.backgroundColor = "#2c2c54"
    }, [state.theme])

    if (!state.isLogged) {
        return <Redirect to='login'/>
    }

    return (
        <div>
            <div className="container">
                <NavBar/>
                <div className="jumbotron jumbotron-fluid mt-7">
                    <div className="container">
                        <h2 className="display-4">Contacts Page</h2>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti fugiat in perferendis qui quod recusandae ut vel! Dicta, libero!</p>
                    </div>
                </div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti fugiat in perferendis qui quod recusandae ut vel! Dicta, libero!</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};
