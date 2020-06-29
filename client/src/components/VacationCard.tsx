import React, {useContext} from "react";
import {appContext} from "../App";
import {IVacation} from "../reducers/reducer";
import {DeleteAction, followAction, likeAction} from "../reducers/appActions";

export const VacationCard: React.FC<IVacation> = ({...vacation}) => {
    const {dispatch, state} = useContext(appContext)
    // console.log(state)
    const style = vacation.follow ? 'card-body follow-card' : 'card-body'

    // useEffect(() => {
    //     if (state.message?.length) {
    //         // console.log(state.message)
    //     }
    //     dispatch({
    //         type: ActionType.ClearMessage
    //     })
    // }, [dispatch, state.message])

    const followHandler = (vacationId: number) => {
        followAction(dispatch, vacationId)
    }
    const likeHandler = (vacationId: number) => {
        likeAction(dispatch, vacationId)
    }

    const deleteHandler = async (vacationId: number) => {
        // eslint-disable-next-line no-restricted-globals
       let del = confirm('are you sure to delete this vacation?')
       del && await DeleteAction(dispatch, vacationId)
    }

    const editHandler = (vacationId: number) => {

    }

    const userButtons = (
        <div>
            <button type="button"
                    className="btn btn-sm btn-outline-warning mr-1"
                    onClick={() => followHandler(vacation.id)}>
                {vacation.follow ? 'unfollow' : 'follow'}
            </button>
            <button type="button"
                    className="btn btn-sm btn-outline-info"
                    onClick={() => likeHandler(vacation.id)}>Like
            </button>
        </div>
    )

    const adminButtons = (
        <div>
            <button type="button"
                    className="btn btn-sm btn-outline-warning mr-1"
                    onClick={() => editHandler(vacation.id)}>
                Edit
            </button>
            <button type="button"
                    className="btn btn-sm btn-outline-info"
                    onClick={() => deleteHandler(vacation.id)}>Delete
            </button>
        </div>
    )

    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <img src={vacation.pictureUrl} className="card-img-top" width="100%" height="225" alt='img'/>

                <div className={style}>
                    <p className="card-text">id: {vacation.id}</p>
                    <p className="card-text">{vacation.name}</p>
                    <p className="card-text">{vacation.description}</p>
                    <small className="card-text">
                        from {vacation.fromDate.toString().slice(0, 10).replace(/-/g, '/')} to {vacation.toDate.toString().slice(0, 10).replace(/-/g, '/')}
                    </small>
                    <p className="card-text">{vacation.price}$</p>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            state.userRole === 'admin'
                                ? adminButtons
                                : userButtons
                        }
                        <small className="text-muted">{vacation.likes} likes</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
