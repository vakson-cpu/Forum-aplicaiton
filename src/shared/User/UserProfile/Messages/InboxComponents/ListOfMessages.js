import React, { useState, useEffect } from "react";
import { getRecievedMessages, sendMailToTrash } from "../../../../Axy/axiosFunctions";
import SingleMessage from "../SingleMessage";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import "./ListOfMessages.css";

const ListOfMessages = () => {
  const logovan = useSelector((state) => state.users.isLoggedIn);
  const [ID, setID] = useState("");
  const [poruke, setPoruke] = useState([]);

  async function Recieve(ID) {
    let rezultat = await getRecievedMessages(ID);
    setPoruke(rezultat);
    console.log("INBOX JE: ", rezultat);
  }

  useEffect(() => {
    if (logovan) {
      let ID = localStorage.getItem("id");
      setID(ID);
      Recieve(ID);
    }
  }, [logovan]);

  async function sendToTrash(MessageID,userID) {
    await sendMailToTrash(MessageID,userID,"INBOX");
    Recieve(ID);
  }


  if (logovan)
    return (
      <>
        <div className="Messages--List--Frame mt-5  ">
          {poruke.map((a) => (
            <SingleMessage
              key={uuid()}
              date={a.date}
              title={a.title}
              desc={a.description}
              ID={ID}
              MessageID={a._id}
              TYPE="TRASH/INBOX"
              sendToTrash={sendToTrash}
              authorID={a.authorID}
              TrashCan={[]}

            />
          ))}
        </div>
      </>
    );
  else return <h1 className="text-white">NOT LOGGED IN</h1>;
};

export default ListOfMessages;
