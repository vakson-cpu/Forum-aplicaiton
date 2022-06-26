import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ReactDom from "react-dom";
import { reportComment, reportThread } from "../../../Axy/axiosFunctions";
export function Example({ showValue, openTheModal, ID, TIP,authorID,pageNumber,threadID }) {
  //Treba mi authorID i commentID ,znaci ovo ce bit report iskljucivo za komentarice.
  const [title, setTitle] = useState("")

  const handleClose = () => {
    openTheModal(false);
  };
  const handleShow = () => {
    openTheModal(true);
  };
  const handleSubmit = () => {
    if (TIP === "COMMENT") reportComment(title,ID, description,authorID,pageNumber || 1,threadID);
    if (TIP === "THREAD") reportThread(title,ID, description,authorID,1);
    openTheModal(false);
  };
  const [description, setDescription] = useState("");
  return ReactDom.createPortal(
    <>
      <Modal className="text-white" show={showValue} onHide={handleClose}>
        <Modal.Header
          className="bg-dark text-white"
          closeVariant="white"
          closeButton
        >
          <Modal.Title className="text-white">Report</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">
              Title
                </Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                autoFocus
              />
    
              <Form.Label className="text-white">
                Why are you reporting?
              </Form.Label>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                type="text"
                autoFocus
              />
    
                  </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className='text-white' >Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white">
          <Button variant="outline-info" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-light" onClick={handleSubmit}>
            Send Report
          </Button>
        </Modal.Footer>
      </Modal>
    </>,
    document.getElementById("reportThread")
  );
}
