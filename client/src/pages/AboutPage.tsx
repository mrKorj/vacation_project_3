import React, {useContext, useEffect} from 'react';
import {NavBar} from "../components/NavBar";
import {Redirect} from "react-router-dom";
import {appContext} from "../App";
import {Footer} from "../components/Footer";

export const AboutPage = () => {
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
                        <h2 className="display-4">About our company</h2>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque dolorem
                            eaque eveniet illo nulla officiis quas quasi tenetur, voluptate voluptates? Aut cumque
                            dolores error impedit minus odio rerum unde voluptate. Aliquid culpa dicta distinctio
                            eligendi explicabo perferendis quo ut voluptas! Accusamus ad animi dolore fugit incidunt
                            nobis sint ut, velit.</p>
                    </div>
                </div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <p className="lead">This application is developed for an educational project and shows the
                            result of developing
                            a single page application using ReactJS, NodeJS and SQL technologies.</p>
                    </div>
                </div>
            </div>
            <Footer toTop={false}/>
        </div>
    );
};
