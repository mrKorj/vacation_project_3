import React from "react";

export interface IVacation {
    id: number,
    name: string,
    description: string,
    fromDate: Date,
    toDate: Date,
    picUrl: string,
    price: number,
    followers?: number,
    likes?: number
}

export const Vacation =()=> {
    return (
        <div>
            <p>vacation card</p>
        </div>
    )
}
