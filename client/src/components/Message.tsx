import React, {useContext} from "react";
import {ActionType} from "../reducers/reducer";
import {appContext} from "../App";

export const Message = () => {
    const {state, dispatch} = useContext(appContext)
    const type = 'warning'

    setTimeout(() => {
        dispatch({
            type: ActionType.ClearMessage
        })
    }, 6000)

    return (
        <div className={`alert alert-${type}`} role="alert">{state.message}</div>
    )
}
