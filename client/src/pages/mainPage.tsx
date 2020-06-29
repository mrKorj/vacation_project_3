import React, {useContext, useEffect} from "react";
import {VacationCard} from "../components/VacationCard";
import {appContext} from "../App";
import {getVacationsAction} from "../reducers/appActions";
import {Footer} from "../components/Footer";
import {LoadingSpinner} from "../components/LoadingSpinner";
import {NavBar} from "../components/NavBar";


export const MainPage: React.FC = () => {
    const {state, dispatch} = useContext(appContext)

    useEffect(() => {
        getVacationsAction(dispatch)
    }, [dispatch])

    if (state.isLoading) {
        return <LoadingSpinner/>
    }

    return (
        <div>
           <NavBar/>
            <div className='container mt-7'>
                {
                    state.userRole === 'admin'
                        ? <div className="alert alert-secondary mt-3"><h4 className=" text-center">Admin Dashboard</h4></div>
                        : <h4 className="text-info mt-3">Follow your dreams...</h4>

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
            <Footer/>
        </div>
    )
}
