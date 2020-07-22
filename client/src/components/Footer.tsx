import React, {useContext} from 'react';
import {appContext} from "../App";

interface IProps {
    toTop: boolean
}

export const Footer: React.FC<IProps> = ({toTop}) => {
    const {state} = useContext(appContext)


    return (
        <>
            <footer className={`text-muted ${state.theme === 'light' ? 'footer' : 'footer-dark'}`}>
                <div className="container-sm footer-mobile">
                    {
                        toTop
                            ? <p className="float-right"><a href="#">Back to top</a></p>
                            : null
                    }

                    <p>All vacations are for example. Developed by Sergey Kremenchugsky © </p>
                    <p>Some question? <a href="mailto:mr.korj@gmail.com">mail me</a> or visit my <a
                        href="https://mrkorj.github.io" target='_blank' rel="noopener noreferrer">portfolio page</a>.
                    </p>
                </div>
            </footer>
        </>
    );
};
