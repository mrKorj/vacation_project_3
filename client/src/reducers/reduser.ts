import {IVacation} from "../components/Vacation";


export interface IState {
    vacations: IVacation[],
    isLogged: boolean,
    isLoading: boolean,
    message?: string
}

export interface IAction {
    type: string,
    payload?: Record<string, any>
}

export const initialState: IState = {
    vacations: [],
    isLoading: false,
    isLogged: false,
    message: ''
}

export enum ActionType {
    LogIn = 'LOGIN',
    LogOut = 'LOG_OUT',
    Loading = 'LOADING',
    LoadingEnd = 'LOADING_END',
    Message = 'MESSAGE',
    ClearMessage = 'CLEAR_MESSAGE'
}

export const reducer = (state: IState, action: IAction): any => {
    switch (action.type) {
        case ActionType.LogOut: {
            return {
                vacations: [],
                isLoading: false,
                isLogged: false,
                message: ''
            }
        }
        case ActionType.Loading: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ActionType.LoadingEnd: {
            return {
                ...state,
                isLoading: false
            }
        }
        case ActionType.LogIn: {
            return {
                ...state,
                isLogged: true
            }
        }
        case ActionType.Message: {
            return {
                ...state,
                message: action.payload
            }
        }
        case ActionType.ClearMessage: {
            return {
                ...state,
                message: ''
            }
        }
        default: {
            return state
        }
    }
}
