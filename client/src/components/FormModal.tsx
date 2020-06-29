import React, {ChangeEvent, FormEvent, useContext, useState} from 'react';
import {Button, Modal, Spinner} from "react-bootstrap";
import {appContext} from "../App";
import {addVacationAction} from "../reducers/appActions";

interface IFormModalProps {
    show: boolean,

    onHide(): void
}

export const FormModal: React.FC<IFormModalProps> = ({show, onHide}) => {
    const {state, dispatch} = useContext(appContext)
    const [input, setInput] = useState({name: '', price: '', fromDate: '', toDate: '', description: '', sampleFile: []})

    const onSubmitHandler = async (event: FormEvent) => {
        event.preventDefault()

        await addVacationAction(dispatch, input)

        setInput({name: '', price: '', fromDate: '', toDate: '', description: '', sampleFile: []})
    }

    const uploadFileChangeEvent = (event: ChangeEvent<any>) => {
        setInput({...input, [event.target.name]: event.target.files[0]})
    }

    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setInput({...input, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <Modal
                {...{show, onHide}}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                animation={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add vacation form
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form onSubmit={onSubmitHandler}>
                            <div className="form-group input-group-sm">
                                <label htmlFor="inputName" className="mt-1">Name</label>
                                <input type="text"
                                       id="inputName"
                                       className="form-control"
                                       placeholder="Name"
                                       required
                                       autoFocus
                                       name='name'
                                       minLength={3}
                                       value={input.name}
                                       onChange={onChange}/>
                                <label htmlFor="inputPrice" className="mt-1">Price</label>

                                <input type="number"
                                       id="inputPrice"
                                       className="form-control"
                                       placeholder="Price"
                                       required
                                       autoFocus
                                       name='price'
                                       value={input.price}
                                       onChange={onChange}/>
                                <label htmlFor="fromDate" className="mt-1">From date</label>

                                <input type="date"
                                       id="fromDate"
                                       className="form-control"
                                       required
                                       autoFocus
                                       name='fromDate'
                                       min={new Date().toISOString().split("T")[0]}
                                       value={input.fromDate}
                                       onChange={onChange}/>
                                <label htmlFor="toDate" className="mt-1">To date</label>

                                <input type="date"
                                       id="toDate"
                                       className="form-control"
                                       required
                                       autoFocus
                                       min={new Date().toISOString().split("T")[0]}
                                       name='toDate'
                                       value={input.toDate}
                                       onChange={onChange}/>

                                <label htmlFor="description" className="mt-1">Description</label>
                                <textarea value={input.description}
                                          required
                                          minLength={5}
                                          name="description"
                                          onChange={onChange}
                                          className="form-control"
                                          placeholder="min 5 characters"
                                          rows={2}/>

                                <label htmlFor="inputFile">Picture</label>
                                <input type="file"
                                       name="sampleFile"
                                       required
                                       onChange={uploadFileChangeEvent}/>
                                <small className="text-danger">file types only: JPEG, PNG, SVG</small>
                                <br/>
                                <small className="text-danger">file size: 2MB maximum</small>
                            </div>
                            {
                                state.isLoading
                                    ? <Button variant="info" type='submit' disabled={state.isLoading}>
                                        <Spinner animation="border" variant="warning"/>
                                    </Button>
                                    : <Button variant="info" type='submit'>Add vacation</Button>
                            }
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide} disabled={state.isLoading}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
