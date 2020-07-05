import React from 'react';
import {Button, Spinner, Modal} from "react-bootstrap";
import {IState} from "../reducers/reducer";

interface IModalProps {
    onHide(): void,
    onSubmitHandler(event: any): void,
    onChange(event: any): void,
    onClose?(): void,
    uploadFileChangeEvent(event: any): void,
    show: boolean,
    state: IState,
    inputVal: any,
    titleText: string,
    required?: boolean
}

export const ModalFormEl: React.FC<IModalProps> = (
    {
        show,
        onHide,
        onSubmitHandler,
        onChange,
        onClose,
        uploadFileChangeEvent,
        state,
        inputVal,
        titleText,
        required = false
    }
) => {

    return (
        <>
            <Modal
                {...{show, onHide}}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                animation={true}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {titleText}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form onSubmit={onSubmitHandler}>
                            <div className="form-group input-group-sm">
                                <label htmlFor="inputName" className="mb-0">Name</label>
                                <input type="text"
                                       id="inputName"
                                       className="form-control"
                                       placeholder="Name"
                                       required
                                       autoFocus
                                       name='name'
                                       minLength={3}
                                       value={inputVal.name}
                                       onChange={onChange}/>
                                <label htmlFor="inputPrice" className="mb-0">Price</label>

                                <input type="number"
                                       id="inputPrice"
                                       className="form-control"
                                       placeholder="Price"
                                       required
                                       autoFocus
                                       name='price'
                                       value={inputVal.price}
                                       onChange={onChange}/>
                                <label htmlFor="fromDate" className="mb-0">From date</label>

                                <input type="date"
                                       id="fromDate"
                                       className="form-control"
                                       required
                                       autoFocus
                                       name='fromDate'
                                       min={new Date().toISOString().split("T")[0]}
                                       value={inputVal.fromDate}
                                       onChange={onChange}/>
                                <label htmlFor="toDate" className="mb-0">To date</label>

                                <input type="date"
                                       id="toDate"
                                       className="form-control"
                                       required
                                       autoFocus
                                       min={new Date().toISOString().split("T")[0]}
                                       name='toDate'
                                       value={inputVal.toDate}
                                       onChange={onChange}/>

                                <label htmlFor="description" className="mb-0">Description</label>
                                <textarea value={inputVal.description}
                                          required
                                          minLength={5}
                                          name="description"
                                          onChange={onChange}
                                          className="form-control"
                                          placeholder="min 5 symbol"
                                          rows={2}/>
                                <label htmlFor="inputFile" className="mb-0">Picture</label>
                                <input type="file"
                                       name="sampleFile"
                                       className="custom-file"
                                       required={required}
                                       onChange={uploadFileChangeEvent}/>

                                {
                                    state.message
                                        ? <p className="text-success">{state.message}</p>
                                        : <>
                                            <small className="text-secondary">file types: JPEG, PNG, SVG</small>
                                            <br/>
                                            <small className="text-secondary">file size: 2MB max</small>
                                        </>
                                }

                            </div>
                            {
                                state.uploadingData
                                    ? <Button variant="info" type='submit' disabled={state.uploadingData}>
                                        <Spinner animation="border" size={"sm"} variant="warning"/> Uploading...
                                    </Button>
                                    : <Button variant="info" type='submit'>Save</Button>
                            }
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        onHide();
                        if (onClose) {
                            onClose()
                        }
                    }} disabled={state.uploadingData}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
