import React, {useContext, useEffect} from "react";
import {VacationCard} from "../components/VacationCard";
import {appContext} from "../App";
import {Footer} from "../components/Footer";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {NavBar} from "../components/NavBar";
import {Redirect} from "react-router-dom";


export const MainPage: React.FC = () => {
    const {state} = useContext(appContext)

    useEffect(() => {
        state.theme === 'light'
            ? document.body.style.backgroundColor = "#f5f5f5"
            : document.body.style.backgroundColor = "#2c2c54"
    }, [state.theme])

    if (!state.isLogged) {
        return <Redirect to='login'/>
    }

    if (state.isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <div>
            <NavBar/>
            <div className='container mt-7 con'>
                {
                    state.userRole === 'admin'
                        ?
                        <div className="alert alert-primary mt-3"><h4 className=" text-center">Admin Dashboard</h4>
                        </div>
                        : <h4 className={`${state.theme === 'light' ? 'text-dark' : 'text-light'} mt-5`}>Follow your
                            dreams...</h4>
                }
                <div className='row mt-3'>
                    {
                        state.vacations.map(vacationCard => {
                            if (vacationCard.follow) {
                                return <VacationCard key={vacationCard.id} {...vacationCard}/>
                            }
                            return <VacationCard key={vacationCard.id} {...vacationCard}/>
                        })
                    }
                </div>
            </div>
            <Footer toTop={true}/>
        </div>
    )
}
