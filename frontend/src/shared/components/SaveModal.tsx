import {Button, InputGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React from "react";

export function SaveModal(props: {
    showSaveModal: boolean,
    handleSaveModalClose: () => void,
    isPublic: boolean,
    newCharacterUrl: string,
    handleSaveModalCopyAndClose: () => Promise<void>
}) {
    const {
        showSaveModal,
        handleSaveModalCopyAndClose,
        isPublic,
        newCharacterUrl,
        handleSaveModalClose
    } = props;
    return <Modal show={showSaveModal} onHide={handleSaveModalClose}>
        <Modal.Header closeButton>
            <Modal.Title>Karakter mentve!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Karaktered az alábbi {isPublic ? 'publikus' : 'privát'} URLen érhető el.</p>
            <p><a href={newCharacterUrl}>{newCharacterUrl}</a></p>
            <InputGroup className="mb-3">
                <Form.Control id="input" value={newCharacterUrl}/>
                <Button variant={"outline-dark"} onClick={() => {
                    let copyText = document.querySelector("#input") as any;
                    copyText?.select()
                    document.execCommand("copy");
                }}>Másolás</Button>
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleSaveModalCopyAndClose}>
                Másolás és bezárás
            </Button>
        </Modal.Footer>
    </Modal>;
}