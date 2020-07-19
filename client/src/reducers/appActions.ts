import {Dispatch} from "react";
import {ActionType, IAction, IVacation} from "./reducer";
import {getToken} from "../token";

const SERVER_URL = '/api/'

export const addVacationAction = async (dispatch: Dispatch<IAction>, {...form}) => {
    dispatch({
        type: ActionType.UploadingData
    })

    const token = getToken()
    const formData = new FormData()
    formData.append('sampleFile', form.sampleFile as any)
    formData.append('form', JSON.stringify(form))

    if (fileSizeCheck(form.sampleFile, dispatch)) return

    try {
        const response = await fetch('/api/add', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })

        const data = await response.json()
        const {message, newVacation} = data

        if (response.status >= 400) {
            dispatch({
                type: ActionType.Message,
                payload: message
            })
            dispatch({
                type: ActionType.UploadingDataEnd
            })
            return
        }

        dispatch({
            type: ActionType.Message,
            payload: message
        })

        dispatch({
            type: ActionType.AddVacation,
            payload: newVacation
        })

        dispatch({
            type: ActionType.UploadingDataEnd
        })
    } catch (e) {
        dispatch({
            type: ActionType.Message,
            payload: 'server error' as any
        })
        dispatch({
            type: ActionType.UploadingDataEnd
        })
    }
}

export const getVacationsAction = async (dispatch: Dispatch<IAction>) => {
    dispatch({
        type: ActionType.Loading
    })

    const token = getToken()

    try {
        const response = await fetch('/api', {
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
            payload: 'server error' as any
        })
    }
}

export const editVacationAction = async (dispatch: Dispatch<IAction>, {...form}) => {
    dispatch({
        type: ActionType.UploadingData
    })

    const token = getToken()
    const formData = new FormData()
    formData.append('sampleFile', form.sampleFile as any)
    formData.append('form', JSON.stringify(form))

    if (fileSizeCheck(form.sampleFile, dispatch)) return

    try {
        const response = await fetch('/api/edit', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        const data = await response.json()
        const {message, editedVacation} = data

        if (response.status >= 400) {
            dispatch({
                type: ActionType.Message,
                payload: message
            })
            dispatch({
                type: ActionType.UploadingDataEnd
            })
            return
        }

        dispatch({
            type: ActionType.EditVacation,
            payload: editedVacation
        })

        dispatch({
            type: ActionType.Message,
            payload: message
        })

        dispatch({
            type: ActionType.UploadingDataEnd
        })
    } catch (e) {
        dispatch({
            type: ActionType.Message,
            payload: 'server error' as any
        })
    }
}

export const followAction = async (dispatch: Dispatch<IAction>, vacationId: number) => {
    const token = getToken()

    try {
        await fetch('/api/follow', {
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
            payload: 'server error' as any
        })
    }
}

export const likeAction = async (dispatch: Dispatch<IAction>, vacationId: number) => {
    const token = getToken()

    try {
        await fetch('/api/like', {
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
            payload: 'server error' as any
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
            type: ActionType.DeleteVacation,
            payload: vacationId as any
        })

    } catch (e) {
        dispatch({
            type: ActionType.Message,
            payload: 'server error' as any
        })
    }
}

export const ChangeThemeAction = (dispatch: Dispatch<IAction>) => {
    dispatch({
        type: ActionType.ChangeTheme
    })
}

const fileSizeCheck = (file: any, dispatch: Dispatch<IAction>) => {
    // check file type
    if (!['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'].includes(file.type)) {
        dispatch({
            type: ActionType.Message,
            payload: 'Only images are allowed.' as any
        })
        dispatch({
            type: ActionType.UploadingDataEnd
        })
        return true;
    }

    // check file size (< 2MB)
    if (file.size > 2 * 1024 * 1024) {
        dispatch({
            type: ActionType.Message,
            payload: 'File must be less than 2MB.' as any
        })
        dispatch({
            type: ActionType.UploadingDataEnd
        })
        return true;
    }
}
