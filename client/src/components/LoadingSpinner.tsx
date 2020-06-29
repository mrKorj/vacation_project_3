import React from 'react';

export const LoadingSpinner = () => {
    return (
        <div className='d-flex justify-content-center m-10'>
            <h3>Loading... </h3>
            <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>

        </div>
    );
};
