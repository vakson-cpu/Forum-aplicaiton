import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import {
  deleteRecievedMailFromTrash,
  deleteSentMailFromTrash,
  getSentMessagesFromTrash,
} from "../../../../Axy/axiosFunctions";
import SingleMessage from "../SingleMessage";
import "./Sent.css";
//Treba da izvrsimo gospodske radnje
//Da overimo kad stigne userID dal je sent il recieved

console.log("Sent Rendering");
const Trash = () => {
  const logovan = useSelector((state) => state.users.isLoggedIn);
  const [ID, setID] = useState("");
  const [poruke, setPoruke] = useState([]);
  const [Loading, setLoading] = useState(false);
  async function Recieve(ID) {
    setLoading(false);
    let rezultat = await getSentMessagesFromTrash(ID);
    console.log("Before rez je ", rezultat);
    rezultat.reverse();
    setPoruke(rezultat);
    setLoading(true);
    console.log("after");
    console.log("SENT  IS: ", rezultat);
  }
  useEffect(() => {
    if (logovan) {
      let ID = localStorage.getItem("id");
      setID(ID);
      Recieve(ID);
    }
  }, [logovan]);

//U Poruci imamo dva idija.
// SEND I INBOX AUTHOR I RECIEVER
//ZNACI PORUKA CE SLATI NAZAD idi neki.,,,
  async function sendToDeath(MessageID, userID) {
    console.log("AUTHOR ID",ID);
    console.log("MID: ",MessageID);
    console.log("User ID ",userID);
    let poruka = poruke.filter((a) => a._id === MessageID);
    let flag = false;
    console.log('a',poruka[0].authorID ," == ", userID)
    if (poruka[0].authorID === ID) flag = true;
    if (flag === true) await deleteSentMailFromTrash(MessageID);
    else await deleteRecievedMailFromTrash(MessageID);
    Recieve(ID);
  }

  if (logovan) {
    if (Loading === false)
      return (
        <div className="Centralize text-center">
          <Spinner animation="border" variant="danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    // //U funkciji if sa dve fuje
    return (
      <>
        <div className="Messages--List--Frame mt-5  ">
          {poruke.map((a) => (
            <SingleMessage //Zajebo sam se sto nisam props.
              key={uuid()}
              date={a.date}
              title={a.title}
              desc={a.description}
              ID={ID}
              recieverID={a.recieverID}
              authorID={a.authorID}
              MessageID={a._id}
              TYPE={"TRASH"}
              TrashCan={a.TrashCan}
              sendToTrash={sendToDeath}
            />
          ))}
        </div>
      </>
    );
  } else return <h1 className="text-white">NOT LOGGED IN...</h1>;
};

export default Trash;
