import React, { useState } from "react";
import ListOfMessages from "./InboxComponents/ListOfMessages";
import "./Inbox.css";
import { Button } from "react-bootstrap";
import Trash from "./InboxComponents/Trash";
import Sent from "./InboxComponents/Sent";
import { Link } from "react-router-dom";
const Inbox = () => {
  const [isInbox, setisInbox] = useState(1);
  return (
    <div className="m-5">
      <div className="d-flex  justify-content-center MH--bg ">
        <Button
          onClick={() => setisInbox(1)}
          className="mx-4 "
          variant="outline-danger"
        >
          Inbox
        </Button>
        <Button
          onClick={() => setisInbox(2)}
          className="mx-4 "
          variant="outline-dark"
        >
          Sent
        </Button>
        <Button
          onClick={() => setisInbox(3)}
          className="mx-4"
          variant="outline-dark"
        >
          Trash
        </Button>
      </div>
      <Link to={`/Messages/Send`}><Button className='PM--Position my-1  ' variant='outline-success' >Send PM</Button></Link>

      {isInbox === 1 && <ListOfMessages />}
      {isInbox === 2 && <Sent />}
      {isInbox === 3 && <Trash />}
    </div>
  );
};

export default Inbox;
