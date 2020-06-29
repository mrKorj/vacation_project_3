import {Dispatch} from "react";
import {ActionType, IAction, IVacation} from "./reducer";
import {getToken} from "../token";

const SERVER_URL = '/api/'

export const addVacationAction = async (dispatch: Dispatch<IAction>, {...form}) => {
    // dispatch({
    //     type: ActionType.Loading
    // })

    const token = getToken()
    const formData = new FormData()
    formData.append('sampleFile', form.sampleFile as any )
    formData.append('form', JSON.stringify(form))

    try {
        const response = await fetch(`${SERVER_URL}add`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })


        const data = await response.json()
        const {message, newVacation} = data

        dispatch({
            type: ActionType.AddVacation,
            payload: newVacation
        })

        dispatch({
            type: ActionType.Message,
            payload: message
        })

        // dispatch({
        //     type: ActionType.LoadingEnd
        // })
    } catch (e) {
        dispatch({
            type: ActionType.Message,
            payload: e
        })
    }
}

export const getVacationsAction = async (dispatch: Dispatch<IAction>) => {
    dispatch({
        type: ActionType.Loading
    })

    const token = getToken()

    try {
        const response = await fetch(SERVER_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await response.json()

        dispatch({
            type: ActionType.GetVacations,
            payload: data.map((v: IVacation) => {
                return {...v, follow: !!v.follow}
            })
        })

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

export const followAction = async (dispatch: Dispatch<IAction>, vacationId: number) => {
    const token = getToken()

    try {
        await fetch(`${SERVER_URL}follow`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({vacationId})
        })

        dispatch({
            type: ActionType.Follow,
            payload: vacationId as any
        })
    } catch (e) {
        dispatch({
            type: ActionType.Message,
            payload: e
        })
    }
}

export const likeAction = async (dispatch: Dispatch<IAction>, vacationId: number) => {
    const token = getToken()

    try {
        await fetch(`${SERVER_URL}like`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({vacationId})
        })

        dispatch({
            type: ActionType.Like,
            payload: vacationId as any
        })
    } catch (e) {
        dispatch({
            type: ActionType.Message,
            payload: e
        })
    }
}

export const DeleteAction = async (dispatch: Dispatch<IAction>, vacationId: number) => {
    const token = getToken()

    try {
        const response = await fetch(`${SERVER_URL}delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({vacationId})
        })
        const data = await response.json()
        const {message} = data

        dispatch({
            type: ActionType.Message,
            payload: message
        })

        dispatch({
            type: ActionType.DeleteVacations,
            payload: vacationId as any
        })

    } catch (e) {
        dispatch({
            type: ActionType.Message,
            payload: e
        })
    }
}
