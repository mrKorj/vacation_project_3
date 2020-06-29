export interface IState {
    vacations: IVacation[],
    isLogged: boolean,
    isLoading: boolean,
    message?: string | null,
    userRole: string | null,
    userId: number | null,
    userName: string | null
}

export interface IVacation {
    id: number,
    name: string,
    description: string,
    fromDate: Date,
    toDate: Date,
    pictureUrl: string,
    price: number,
    follow?: boolean,
    likes?: number
}

export interface IAction {
    type: string,
    payload?: Record<string, any>
}

export const initialState: IState = {
    vacations: [],
    isLoading: false,
    isLogged: false,
    message: null,
    userRole: null,
    userId: null,
    userName: null
}

export enum ActionType {
    UserLogIn = 'LOGIN',
    UserLogOut = 'USER_LOGOUT',
    Loading = 'LOADING',
    LoadingEnd = 'LOADING_END',
    Message = 'MESSAGE',
    ClearMessage = 'CLEAR_MESSAGE',
    GetVacations = 'GET_VACATIONS',
    DeleteVacations = 'DELETE_VACATIONS',
    Follow = 'FOLLOW',
    Like = 'LIKE',
    AddVacation = 'ADD_VACATION'
}

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case ActionType.GetVacations: {
            return {
                ...state,
                vacations: action.payload as any
            }
        }
        case ActionType.DeleteVacations: {
            const vacationId = action.payload as any

            return {
                ...state,
                vacations: state.vacations.filter(vacation => vacation.id !== vacationId)
            }
        }
        case ActionType.AddVacation: {
            // state.vacations.push(action.payload as IVacation)
            return {
                ...state,
                vacations: state.vacations.concat(action.payload as IVacation)
            }
        }
        case ActionType.Follow: {
            const vacationId = action.payload as any

            return {
                ...state,
                vacations: state.vacations.map((vacation) => {
                    if (vacation.id === vacationId) {
                        vacation.follow = !vacation.follow
                    }
                    return vacation
                })
            }
        }
        case ActionType.Like: {
            const vacationId = action.payload as any

            return {
                ...state,
                vacations: state.vacations.map((vacation) => {
                    if (vacation.id === vacationId) {
                        vacation.likes!++
                    }
                    return vacation
                })
            }
        }
        case ActionType.UserLogIn: {
            const {userRole, userId, userName} = action.payload as any

            return {
                ...state,
                isLogged: true,
                userRole,
                userId,
                userName
            }
        }
        case ActionType.UserLogOut: {
            return {
                vacations: [],
                isLoading: false,
                isLogged: false,
                message: null,
                userRole: null,
                userId: null,
                userName: null
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
        case ActionType.Message: {
            return {
                ...state,
                message: action.payload as any
            }
        }
        case ActionType.ClearMessage: {
            return {
                ...state,
                message: null
            }
        }

        default: {
            return state
        }
    }
}
