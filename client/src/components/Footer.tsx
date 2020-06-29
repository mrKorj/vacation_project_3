import React from 'react';

export const Footer = () => {
    return (
        <>
            <footer className="text-muted">
                <div className="container">
                    <p className="float-right">
                        <a href="/">Back to top</a>
                    </p>
                    <p>All vacations are for example. Developed by Sergy Kremenchugsky © </p>
                    <p>Some question? <a href="mailto:mr.korj@gmail.com">mail me</a> or visit my <a
                        href="https://mrkorj.github.io" target='_blank' rel="noopener noreferrer">portfolio page</a>.</p>
                </div>
            </footer>
        </>
    );
};
