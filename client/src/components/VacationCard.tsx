import React, {useContext, useState} from "react";
import {appContext} from "../App";
import {IVacation} from "../reducers/reducer";
import {DeleteAction, followAction, likeAction} from "../reducers/appActions";
import {EditForm} from "./EditForm";

export const VacationCard: React.FC<IVacation> = ({...vacation}) => {
    const {dispatch, state} = useContext(appContext)
    const [modalShow, setModalShow] = useState(false)

    const followHandler = (vacationId: number) => {
        followAction(dispatch, vacationId)
    }
    const likeHandler = (vacationId: number) => {
        likeAction(dispatch, vacationId)
    }

    const deleteHandler = async (vacationId: number) => {
        // eslint-disable-next-line no-restricted-globals
        const del = confirm('are you sure to delete this vacation?')
        del && await DeleteAction(dispatch, vacationId)
    }

    const editHandler = () => {
        setModalShow(true)
    }

    const userButtons = (
        <>
            <div>
                <button type="button"
                        className={`btn btn-sm ${vacation.follow ? 'btn-outline-info' : 'btn-outline-warning'} mr-1`}
                        onClick={() => followHandler(vacation.id)}>
                    {vacation.follow ? 'unfollow' : 'follow'}
                </button>
            </div>
            <span className="text-muted" onClick={() => likeHandler(vacation.id)}>{vacation.likes} <i
                className="far fa-heart" role="button"/></span>
        </>
    )

    const adminButtons = (
        <>
            <div>
                <button type="button"
                        className="btn btn-sm btn-outline-info mr-1"
                        onClick={editHandler}>
                    Edit <i className="far fa-edit"/>
                </button>
                <button type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteHandler(vacation.id)}>Delete <i className="far fa-trash-alt"/>
                </button>
                <EditForm show={modalShow} vacation={vacation} onHide={() => setModalShow(false)}/>
            </div>
            <span className="text-muted">{vacation.likes} likes</span>
        </>
    )

    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <img src={vacation.pictureUrl} className="card-img-top" width="100%" height="225" alt='img'/>

                <div className={vacation.follow ? 'card-body follow-card' : 'card-body'}>
                    <p className="card-text"><small>name:</small> {vacation.name}</p>
                    <p className="card-text"><small>descriptions:</small> {vacation.description}</p>
                    <small className="card-text">
                        from {new Date(new Date(vacation.fromDate).getTime()).toLocaleDateString()} to {new Date(new Date(vacation.toDate).getTime()).toLocaleDateString()}
                    </small>
                    <p className="card-text"><small>price:</small> {vacation.price}$</p>
                    <hr/>
                    <div className="d-flex justify-content-between align-items-center">
                        {
                            state.userRole === 'admin'
                                ? adminButtons
                                : userButtons
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
