export interface IState {
    vacations: IVacation[],
    isLogged: boolean,
    isLoading: boolean,
    uploadingData?: boolean,
    message?: string | null,
    userRole: string | null,
    userId: number | null,
    userName: string | null,
    theme: string,
    socketId: {}
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
    likes?: number,
    countFollowers?: number
}

export interface IAction {
    type: string,
    payload?: Record<string, any>
}

export const initialState: IState = {
    vacations: [],
    isLoading: false,
    uploadingData: false,
    isLogged: false,
    message: null,
    userRole: null,
    userId: null,
    userName: null,
    theme: 'light',
    socketId: {}
}

export enum ActionType {
    UserLogIn = 'LOGIN',
    UserLogOut = 'USER_LOGOUT',
    Loading = 'LOADING',
    LoadingEnd = 'LOADING_END',
    UploadingDataEnd = 'UPLOADING_DATA_END',
    UploadingData = 'UPLOADING_DATA',
    Message = 'MESSAGE',
    ClearMessage = 'CLEAR_MESSAGE',
    GetVacations = 'GET_VACATIONS',
    DeleteVacation = 'DELETE_VACATION',
    EditVacation = 'EDIT_VACATIONS',
    Follow = 'FOLLOW',
    Like = 'LIKE',
    AddVacation = 'ADD_VACATION',
    ChangeTheme = 'CHANGE_THEME',
    GetCountFollowers = 'GET_COUNT_FOLLOWERS'
}

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case ActionType.GetVacations: {
            return {
                ...state,
                vacations: action.payload as any
            }
        }
        case ActionType.DeleteVacation: {
            const vacationId = action.payload as any

            return {
                ...state,
                vacations: state.vacations.filter(vacation => vacation.id !== vacationId)
            }
        }
        case ActionType.AddVacation: {
            return {
                ...state,
                vacations: state.vacations.concat(action.payload as IVacation)
            }
        }
        case ActionType.EditVacation: {
            const data = action.payload as any

            const vacations = state.vacations.map((vacation) => {
                if (vacation.id === data.id) {
                    vacation.name = data.name
                    vacation.price = data.price
                    vacation.description = data.description
                    vacation.toDate = data.toDate
                    vacation.fromDate = data.fromDate
                    vacation.pictureUrl = data.pictureUrl
                }
                return vacation
            })

            return {
                ...state,
                vacations
            }
        }
        case ActionType.Follow: {
            const vacationId = action.payload as any
            const vacations = state.vacations.map((vacation) => {
                if (vacation.id === vacationId) {
                    vacation.follow = !vacation.follow
                }
                return vacation
            })

            return {
                ...state,
                vacations
            }
        }
        case ActionType.GetCountFollowers: {
            const {vacationId, countFollowers} = action.payload as any

            return {
                ...state,
                vacations: state.vacations.map((vacation) => {
                    if (vacation.id === vacationId) {
                        vacation.countFollowers = countFollowers
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
            state = initialState

            return {
                ...state
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
        case ActionType.UploadingData: {
            return {
                ...state,
                uploadingData: true
            }
        }
        case ActionType.UploadingDataEnd: {
            return {
                ...state,
                uploadingData: false
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
        case ActionType.ChangeTheme: {
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            }
        }

        default: {
            return state
        }
    }
}
