import React, {useContext} from 'react';
import {appContext} from "../App";

export const Footer: React.FC = () => {
    const {state} = useContext(appContext)

    return (
        <>
            <footer className={`text-muted ${state.theme === 'light' ? 'footer' : 'footer-dark'}`}>
                <div className="container-sm">
                    <p className="float-right">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#">Back to top</a>
                    </p>
                    <p>All vacations are for example. Developed by Sergy Kremenchugsky © </p>
                    <p>Some question? <a href="mailto:mr.korj@gmail.com">mail me</a> or visit my <a
                        href="https://mrkorj.github.io" target='_blank' rel="noopener noreferrer">portfolio page</a>.
                    </p>
                </div>
            </footer>
        </>
    );
};
