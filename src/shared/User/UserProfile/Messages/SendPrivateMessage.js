import React, { useState, useEffect } from "react";
import { Button, Row, Col, Toast } from "react-bootstrap";
import { useSelector } from "react-redux";
import { SMTP } from "../../../Axy/axiosFunctions";
import "./SendPM.css";
const SendPrivateMessage = () => {
  const [Text, setText] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [ID, setID] = useState("");
  const Users = useSelector((state) => state.users.Users);
  const isLogged = useSelector((state) => state.users.isLoggedIn);
  const [TOASTY_TEXT, setTOASTY_TEXT] = useState("");
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);
  console.log("RENDER", Text);

  useEffect(() => {
    if (isLogged) setID(localStorage.getItem("id"));
    console.log(ID);
  }, [isLogged]);

  const onSuggestionChange = (val) => {
    setText(val);
    setSuggestions([]);
  };
  const onTextChange = (tekst) => {
    let matches = [];
    setText(tekst);
    if (tekst.length > 0) {
      matches = Users.filter((user) => {
        const regex = new RegExp(`${Text}`, "gi");
        return user.name.match(regex);
      });
    }
    console.log("matches: ", matches);
    setSuggestions(matches);
  };

  // const onTextChange=(tekst)=>{
  //     setText(tekst);
  //     console.log(Text);
  // }

  const submitHandler = async () => {
    console.log("ID: ", ID);
    console.log("TEXT: ", Text);
    let matches = Users.filter((a) => a.name === Text);
    if (matches.length === 0) {
      setTOASTY_TEXT("Korisnik Ne Postoji...");
      toggleShowA();
      return 0;
    }
    console.log("DESCRIPTION: ", description);
    if (description.length <= 0 || Text.length <= 0 || title.length <= 0) {
      setTOASTY_TEXT("Nijedno od polja ne sme biti prazno...")
      toggleShowA();
      return 0;
    }
    await SMTP(Text, ID, description, title);
  };
  return (
    <div className="w-100 ">
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">GRESKA U SLANJU</strong>
        </Toast.Header>
        <Toast.Body>{TOASTY_TEXT}</Toast.Body>
      </Toast>
      <div className="my-5 py-3 bg-black w-75 m-auto rounded border border-secondary">
        <h4 className="text-center text-white">Send Private Message</h4>
        <Row>
          <Col md={2}>
            <p className="text-center  text-white">Recipient</p>
          </Col>
          <Col className="mx-0 ">
            <input
              value={Text}
              className="  w-25"
              onChange={(e) => onTextChange(e.target.value)}
              type={"text"}
            ></input>
            {suggestions &&
              suggestions.map((suggestions, i) => (
                <div
                  key={i}
                  onClick={(e) => onSuggestionChange(suggestions.name)}
                  className="w-25 suggestions text-black "
                >
                  {suggestions.name}
                </div>
              ))}
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            {" "}
            <p className="text-white text-center ">Subject</p>
          </Col>
          <Col className="mx-0">
            {" "}
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-50"
              type={"text"}
            ></input>
          </Col>
        </Row>
        <br></br>

        <Row>
          <Col md={2}>
            <p className=" text-center  text-white ">Message:</p>
          </Col>
          <Col className="mx-0">
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="w-75"
            ></textarea>
          </Col>
        </Row>
        <div className="my-5 text-center">
          <Button
            onClick={submitHandler}
            className="w-25"
            variant="outline-light   "
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendPrivateMessage;
