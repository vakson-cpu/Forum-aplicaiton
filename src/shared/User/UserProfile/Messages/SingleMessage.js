import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendMailToTrash } from "../../../Axy/axiosFunctions";
import "./SingleMessage.css";
const SingleMessage = ({
  ID,
  desc,
  title,
  date,
  authorID,
  MessageID,
  TYPE,
  sendToTrash,
  recieverID,
  TrashCan,
}) => {
  // const [User, setUser] = useState({});
  const Users = useSelector((state) => state.users.Users);
  const logovan = useSelector((state) => state.users.isLoggedIn);
  const [User, setUser] = useState({});
  const isLoading = useSelector((state) => state.users.status);

  var CurrTime = Date(date);
  let TheRealID = "";

  if (TYPE === "TRASH/SENT") TheRealID = recieverID;
  else if (TYPE === "TRASH/INBOX") TheRealID = authorID;
  else if (TYPE === "TRASH") {
    if (TrashCan.includes(recieverID)) TheRealID = recieverID;
    else TheRealID = authorID;
  } else TheRealID = authorID;
// Iz komponenti Sent i List saljemo koji je tip
//iz Trasha kupimo info da li je poslata il jok...
//Kada je brisanje u pitanju samo id logovonog trebamo slati
  function FilterHandler() {
    if (logovan && isLoading === "success") {
      // let ID = localStorage.getItem("id");
      let pom = Users.filter((a) => a._id === TheRealID);
      setUser(pom[0]);
    }
  }

  useEffect(() => {
    FilterHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logovan]);

  if (logovan) {
    return (
      <div className="mx-2  px-0 text-black">
        <Row className="border mx-0 px-0 Padding">
          <Col className="border text-center" xs={1}>
            <i className="fa-solid fa-envelope "></i>
          </Col>
          <Col className="border" xs={4}>
            <Link className="Message--Link--Colors"   to={`/Messages/Message/${MessageID}`}>
              {title || "nema"}
            </Link>
          </Col>
          <Col className="border" xs={2}>
            {User.name}
          </Col>
          <Col className="border">{CurrTime}</Col>
          <Col className="border text-center" xs={1}>
            {TYPE === "TRASH/INBOX" || "TRASH/SENT" ? (
              <i
                onClick={() => sendToTrash(MessageID, ID)} 
                className="  fa-solid fa-trash"
              ></i>
            ) : (
              <i
                onClick={() => sendToTrash(MessageID, ID)}
                className="  fa-solid fa-trash"
              ></i>
            )}
          </Col>
        </Row>
      </div>
    );
  } else return <h1 className="text-white">NO ACCESS OVER HERE DOG</h1>;
};

export default SingleMessage;
