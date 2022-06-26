import React, { useState, useEffect } from "react";
import ListOfMessages from "./InboxComponents/ListOfMessages";
import "./Inbox.css";
import { Button } from "react-bootstrap";
import Trash from "./InboxComponents/Trash";
import Sent from "./InboxComponents/Sent";
import { Link } from "react-router-dom";
import Reports from "./Reports/Reports";
import { useSelector } from "react-redux";
const Inbox = () => {
  const [isInbox, setisInbox] = useState(1);
  const Users = useSelector((state) => state.users.Users);
  const logged = useSelector((state) => state.users.isLoggedIn);
  const [User, setUser] = useState({});

  useEffect(() => {
    if (logged === true) {
      let pomID = localStorage.getItem("id");
      console.log(pomID);
      console.log("Users", Users);
      let users = Users.filter((a) => a._id === pomID);
      console.log("Moderator:", users);
      if (users.length > 0) setUser(users[0]);
    }
  }, [logged]);

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
        {User.Tip === "M" && (
          <Button
            onClick={() => setisInbox(4)}
            className="mx-4"
            variant="outline-dark"
          >
            Reports
          </Button>
        )}
      </div>

      <Link to={`/Messages/Send`}>
        <Button className="PM--Position my-1  " variant="outline-success">
          Send PM
        </Button>
      </Link>

      {isInbox === 1 && <ListOfMessages />}
      {isInbox === 2 && <Sent />}
      {isInbox === 3 && <Trash />}
      {isInbox === 4 && <Reports />}
    </div>
  );
};

export default Inbox;
