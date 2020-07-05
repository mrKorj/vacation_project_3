import {clearToken, getToken, saveToken} from "../token";
import {Dispatch} from "react";
import {ActionType, IAction} from "./reducer";

const SERVER_URL = '/api/authorization/'

export const AuthenticationAction = async (dispatch: Dispatch<IAction>) => {
    dispatch({
        type: ActionType.Loading
    })

    const token = getToken()

    if (!token) {
        dispatch({
            type: ActionType.LoadingEnd
        })
        return
    }

    try {
        const response = await fetch('/api/authentication', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status >= 400) {
            dispatch({
                type: ActionType.LoadingEnd
            })
            return
        }
        const data = await response.json()

        dispatch({
            type: ActionType.UserLogIn,
            payload: data
        })

        dispatch({
            type: ActionType.LoadingEnd
        })

    } catch (e) {
        dispatch({
            type: ActionType.LoadingEnd
        })
    }
}

export const RegisterAction = async ({...form}, dispatch: Dispatch<IAction>) => {
    dispatch({
        type: ActionType.Loading
    })

    try {
        const response = await fetch(`${SERVER_URL}register`, {
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
                type: ActionType.UserLogIn,
                payload: data
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

export const LogInAction = async ({...form}, dispatch: Dispatch<IAction>) => {
    dispatch({
        type: ActionType.Loading
    })

    try {
        const response = await fetch(`${SERVER_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        const data = await response.json()
        const {token, message} = data

        dispatch({
            type: ActionType.Message,
            payload: message
        })

        if (token) {
            saveToken(token)
            dispatch({
                type: ActionType.UserLogIn,
                payload: data
            })
        }

        dispatch({
            type: ActionType.LoadingEnd
        })
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

export const LogOutAction = (dispatch: Dispatch<IAction>) => {
    clearToken()
    dispatch({
        type: ActionType.UserLogOut
    })
}
