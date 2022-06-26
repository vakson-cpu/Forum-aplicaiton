import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import {
  getSentMessages,
  sendMailToTrash,
} from "../../../../Axy/axiosFunctions";
import SingleMessage from "../SingleMessage";
import "./Sent.css";

console.log("Sent Rendering");
const Sent = () => {
  const logovan = useSelector((state) => state.users.isLoggedIn);
  const [ID, setID] = useState("");
  const [poruke, setPoruke] = useState([]);
  const [Loading, setLoading] = useState(false);

  async function Recieve(ID) {
    setLoading(false);
    let rezultat = await getSentMessages(ID);
    console.log("Before rez je ", rezultat);
    rezultat.reverse();
    setPoruke(rezultat);
    setLoading(true);
    console.log("after");
    console.log("SENT  IS: ", rezultat);
  }
  async function sendToTrash(MessageID, userID) {
    await sendMailToTrash(MessageID, userID, "SENT");
    Recieve(ID);
  }

  useEffect(() => {
    if (logovan) {
      let ID = localStorage.getItem("id");
      setID(ID);
      Recieve(ID);
    }
  }, [logovan]);

  if (logovan) {
    if (Loading === false)
      return (
        <div className="Centralize text-center">
          <Spinner animation="border" variant="danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    return (
      <>
        <div className="Messages--List--Frame mt-5  ">
          {poruke.map((a) => (
            <SingleMessage
              key={uuid()}
              date={a.date}
              title={a.title}
              desc={a.descriptsion}
              MessageID={a._id}
              ID={ID}
              recieverID={a.recieverID}
              sendToTrash={sendToTrash}
              TYPE="TRASH/SENT"
              TrashCan={[]}
            />
          ))}
        </div>
      </>
    );
  } else return <h1 className="text-white">NOT LOGGED IN...</h1>;
};

export default Sent;
