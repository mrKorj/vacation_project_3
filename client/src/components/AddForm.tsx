import React, {ChangeEvent, FormEvent, useContext, useState} from 'react';
import {appContext} from "../App";
import {addVacationAction} from "../reducers/appActions";
import {ActionType} from "../reducers/reducer";
import {ModalFormEl} from "./ModalFormEl";

interface IFormModalProps {
    show: boolean,
    onHide(): void
}

export const AddForm: React.FC<IFormModalProps> = ({show, onHide}) => {
    const {state, dispatch} = useContext(appContext)
    const [inputVal, setInputVal] = useState({name: '', price: '', fromDate: '', toDate: '', description: '', sampleFile: []})

    const onSubmitHandler = async (event: FormEvent) => {
        event.preventDefault()

        await addVacationAction(dispatch, inputVal)
    }

    const uploadFileChangeEvent = (event: ChangeEvent<any>) => {
        setInputVal({...inputVal, [event.target.name]: event.target.files[0]})
    }

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setInputVal({...inputVal, [event.target.name]: event.target.value})
    }

    const onClose = () => {
        dispatch({
            type: ActionType.ClearMessage
        })
        setInputVal({name: '', price: '', fromDate: '', toDate: '', description: '', sampleFile: []})
    }

    return (
        <>
            <ModalFormEl show={show}
                         onHide={onHide}
                         onSubmitHandler={onSubmitHandler}
                         onChange={onChange}
                         onClose={onClose}
                         uploadFileChangeEvent={uploadFileChangeEvent}
                         state={state}
                         inputVal={inputVal}
                         titleText={'Add vacation form'}
            />
        </>
    );
};
