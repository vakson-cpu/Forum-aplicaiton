import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetMessageByID, ReadMessage } from "../../../../Axy/axiosFunctions";
//PM CE DA iMA TEXT PORUKE I DESCRIPTION
const PM = () => {
  let MessageID = useParams().MessageID;
  let TYPE = useParams().TYPE;

  console.log("MESSAGEEE",MessageID);
  console.log("TYPE",TYPE);
  const Users = useSelector((state) => state.users.Users);

  const [Message, setMessage] = useState({});
  const [name, setName] = useState("");
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    if (TYPE === "INBOX") ReadMessage(MessageID);
  }, []);

  useEffect(() => {
    async function Prikupi() {
      let pom = await GetMessageByID(MessageID);
      setMessage(pom);
      //Ovo more da fejla
      console.log("Pretraga... ", pom.authorID);
      let pomUser = Users.filter((a) => a._id === pom.authorID);
      console.log("PomUserJe,", pomUser);
      setName(pomUser[0].name);
      setLoading(false);
    }
    Prikupi();
  }, []);
  if (Loading === false)
    return (
      <div className="bg-black w-75 m-auto mt-5">
        <div className="w-100 border border-2 border-light">
          <h4 className="text-white p-md-3 border-bottom border-warning">
            A Message from: {name}
          </h4>
          <h6 className="text-white p-md-3">Title: {Message.title} </h6>
          <p className="text-white   p-md-3">
            Description: {Message.description}{" "}
          </p>
        </div>
      </div>
    );
  else return <div>Loading...</div>;
};

export default PM;
