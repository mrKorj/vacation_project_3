import React, {useContext, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {appContext} from "../App";
import {LogInAction} from "../reducers/authActions";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {ActionType} from "../reducers/reducer";


interface ILogIn {
    userName: string,
    password: string,
    token?: string,
    message?: string
}

export const LogInPage: React.FC = () => {
    const [form, setForm] = useState<ILogIn>({userName: '', password: ''})
    const {state, dispatch} = useContext(appContext)

    useEffect(() => {
        if (state.message?.length) {
            console.log(state.message)
        }
        dispatch({
            type: ActionType.ClearMessage
        })
    }, [state.message, dispatch])

    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    if (state.isLogged) {
        return <Redirect to='/'/>
    }

    if (state.isLoading) {
        return <LoadingSpinner/>
    }

    const logInHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        await LogInAction({...form}, dispatch)
    }

    return (
        <div className="text-center container">
            <form className="form-signin" onSubmit={logInHandler}>
                <img className="mb-1" src="img/vacation.png" alt="logo"
                     width="250" height="250"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputUserName" className="sr-only">User name</label>
                <input type="text" name="userName"
                       id="inputUserName"
                       className="form-control"
                       placeholder="User name"
                       required
                       autoFocus
                       value={form.userName}
                       onChange={formHandler}
                />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password"
                       name="password"
                       id="inputPassword"
                       className="form-control"
                       placeholder="Password"
                       required
                       value={form.password}
                       onChange={formHandler}/>
                <div className="checkbox mb-3 mt-3">
                    <label>
                        <Link to='/register'>New user? Registration</Link>
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={state.isLoading}>
                    Sign in
                </button>
                <p className="mt-5 mb-3 text-muted">© Sergey Kremenchugsky 2020</p>
            </form>
        </div>
    )
}
