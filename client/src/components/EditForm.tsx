import React, {ChangeEvent, FormEvent, useContext, useState} from 'react';
import {appContext} from "../App";
import {IVacation} from "../reducers/reducer";
import {ModalFormEl} from "./ModalFormEl";
import {editVacationAction} from "../reducers/appActions";

interface IFormModalProps {
    show: boolean,
    vacation: IVacation
    onHide(): void,
}

export const EditForm: React.FC<IFormModalProps> = ({show, onHide, vacation}) => {
    const {state, dispatch} = useContext(appContext)

    const [inputVal, setInputVal] = useState(
        {
            id: vacation.id,
            name: vacation.name,
            price: vacation.price,
            fromDate: vacation.fromDate.toString().slice(0, 10),
            toDate: vacation.toDate.toString().slice(0, 10),
            description: vacation.description
        }
    )

    const onSubmitHandler = async (event: FormEvent) => {
        event.preventDefault()

        await editVacationAction(dispatch, inputVal)
    }

    const uploadFileChangeEvent = (event: ChangeEvent<any>) => {
        setInputVal({...inputVal, [event.target.name]: event.target.files[0]})
    }

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setInputVal({...inputVal, [event.target.name]: event.target.value})
    }

    return (
        <ModalFormEl show={show}
                     onHide={onHide}
                     onSubmitHandler={onSubmitHandler}
                     onChange={onChange}
                     uploadFileChangeEvent={uploadFileChangeEvent}
                     state={state}
                     inputVal={inputVal}
                     titleText={'Edit vacation form'}
                     required={false}
        />
    );
};

