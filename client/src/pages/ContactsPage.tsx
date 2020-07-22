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
            <div className="container con">
                <NavBar/>
                <div className="jumbotron jumbotron-fluid mt-7">
                    <div className="container">
                        <h2 className="display-4">Contact us</h2>

                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti
                            fugiat in perferendis qui quod recusandae ut vel! Dicta, libero!</p>

                        <div className="social-about text-secondary m-4">
                            <span>Contacts:</span>
                            <p><i className="fa fa-phone"/> +972-3-123456789</p>
                            <a className="m-2 text-decoration-none"
                               href="https://linkedin.com/in/sergy-kremenchugsky-31644b159"
                               target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"/> LinkedIn</a>
                            <a className="m-2 text-decoration-none"
                               href="https://github.com/mrKorj"
                               target="_blank" rel="noopener noreferrer"><i className="fab fa-github"/> GitHub</a>
                            <a className="m-2 text-decoration-none" href="mailto:mr.korj@gmail.com"><i
                                className="fas fa-at"/> Email</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer toTop={false}/>
        </div>
    );
};
