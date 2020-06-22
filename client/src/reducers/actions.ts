import {clearToken, saveToken} from "../token";
import {Dispatch} from "react";
import {ActionType, IAction} from "./reduser";


export const Register = async ({...form}, dispatch: Dispatch<IAction>) => {
    dispatch({
        type: ActionType.Loading
    })

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const data = await response.json()
        const {token, message} = data

        dispatch({
            type: ActionType.LoadingEnd
        })

        dispatch({
            type: ActionType.Message,
            payload: message
        })

        if (token) {
            saveToken(token)
            dispatch({
                type: ActionType.LogIn
            })
        }
    } catch (e) {
        dispatch({
            type: ActionType.LoadingEnd
        })
        dispatch({
            type: ActionType.Message,
            payload: e
        })
    }
}

export const LogIn = async ({...form}, dispatch: Dispatch<IAction>) => {
    dispatch({
        type: ActionType.Loading
    })

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const data = await response.json()
        const {token, message} = data

        dispatch({
            type: ActionType.LoadingEnd
        })

        dispatch({
            type: ActionType.Message,
            payload: message
        })

        if (token) {
            saveToken(token)
            dispatch({
                type: ActionType.LogIn
            })
        }

    } catch (e) {
        dispatch({
            type: ActionType.LoadingEnd
        })
        dispatch({
            type: ActionType.Message,
            payload: e
        })
    }
}

export const LogOut = (dispatch: Dispatch<IAction>) => {
    clearToken()
    dispatch({
        type: ActionType.LogOut
    })
}
