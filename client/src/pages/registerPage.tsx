import React, {useContext, useEffect, useState} from "react";
import {appContext} from "../App";
import {RegisterAction} from "../reducers/authActions";
import {Link, Redirect} from "react-router-dom";
import {ActionType} from "../reducers/reducer";


interface IRegister {
    userName: string,
    firstName: string,
    lastName: string,
    password: string
}

export const RegisterPage: React.FC = () => {
    const [form, setForm] = useState<IRegister>({firstName: '', lastName: '', userName: '', password: ''})
    const {state, dispatch} = useContext(appContext)

    useEffect(() => {
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

    const onSubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        await RegisterAction({...form}, dispatch)
    }

    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <div className="text-center container">
            <form className="form-signin" onSubmit={onSubmitHandler}>
                <img className="mb-1" src="img/vacation.png" alt="logo"
                     width="250" height="250"/>
                <h1 className="h3 mb-3 font-weight-normal">Registration form</h1>

                <label htmlFor="inputName" className="sr-only">Name</label>
                <input type="text"
                       id="inputName"
                       className="form-control"
                       placeholder="Name"
                       required
                       autoFocus
                       name='firstName'
                       value={form.firstName}
                       onChange={formHandler}/>
                <label htmlFor="inputLastName" className="sr-only">Last name</label>
                <input type="text"
                       id="inputLastName"
                       className="form-control"
                       placeholder="Last name"
                       required
                       name='lastName'
                       value={form.lastName}
                       onChange={formHandler}/>

                <label htmlFor="inputUserName" className="sr-only">User Name</label>
                <input type="text"
                       id="inputUserName"
                       className="form-control"
                       placeholder="User name"
                       required
                       name='userName'
                       value={form.userName}
                       onChange={formHandler}/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password"
                       id="inputPassword"
                       className="form-control"
                       placeholder="Password"
                       required
                       name='password'
                       value={form.password}
                       onChange={formHandler}/>
                <div className="mb-3">
                    <p className="text-danger">* all fields are required</p>
                </div>
                <div className="checkbox mb-1 mt-1">
                    <label>
                        <Link to='/login'> LogIn </Link>
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={state.isLoading}>
                    {state.isLoading
                        ? <span className="spinner-border spinner-border" role="status" aria-hidden="true"/>
                        : 'Register'}
                </button>
                <p className="mt-5 mb-3 text-muted">© Sergey Kremenchugsky 2020</p>
            </form>
        </div>
    )
}
