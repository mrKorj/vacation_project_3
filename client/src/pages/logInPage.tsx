import React, {useContext, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {appContext} from "../App";
import {LogIn} from "../reducers/actions";
import {ActionType} from "../reducers/reduser";


interface ILogIn {
    userName: string,
    password: string,
    token?: string,
    message?: string
}

export const LogInPage: React.FC = () => {
    const [form, setForm] = useState<ILogIn>({userName: '', password: ''})
    const {state, dispatch} = useContext(appContext)

    useEffect(()=> {
        if (state.message?.length) {
            alert(state.message)
        }
        dispatch({
            type: ActionType.ClearMessage
        })
    }, [state.message, dispatch])

    if (state.isLogged) {
        return <Redirect to='/'/>
    }

    const logInHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        await LogIn({...form}, dispatch)


    }

    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    return (
        <div className="text-center">
            <form className="form-signin" onSubmit={logInHandler}>
                <img className="mb-4" src="img/VLogo.png" alt="logo"
                     width="72" height="72"/>
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
                        <Link to='/register'> New user ? Registration.</Link>
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={state.isLoading}>
                    {state.isLoading
                        ? <span className="spinner-border spinner-border" role="status" aria-hidden="true"/>
                        : "Sign in"}
                </button>
                <p className="mt-5 mb-3 text-muted">© Sergey Kremenchugsky 2020</p>
            </form>
        </div>
    )
}
