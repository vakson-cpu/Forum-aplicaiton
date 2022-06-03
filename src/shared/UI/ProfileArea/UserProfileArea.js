import React, { useState, useEffect,useRef } from "react";
import UserModal from "../../User/UserModal";
import { Col, Row } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import "./UserProfileArea.css";
import slika from "./index.png";
import "./animacija2.css";
import { useSelector, useDispatch } from "react-redux";
import { LogInuj, LogOut } from "../../../Redux/Reducers/UserSlices";
import { getUserByID } from "../../Axy/axiosFunctions";
import { Link } from "react-router-dom";


const UserProfileArea = () => {
  const inputElement = useRef();
  const [open, setOpen] = useState(false);
  const Dispatch = useDispatch();
  const logovan = useSelector((state) => state.users.isLoggedIn);
  const korisnik = useSelector((state) => state.users.Users);
  const [imeKorisnika, setImeKorisnika] = useState("");
  const [ID, setID] = useState('')
  async function Check() {
    if (localStorage.length > 0) {
      console.log("Ima nesto u ls");
      let id = localStorage.getItem("id");
      let pom = await getUserByID(id);
      console.log(id);
      console.log(pom.user.name)
      setID(id);
      setImeKorisnika(prev=>pom.user.name);
      Dispatch(LogInuj())
    }
  }

  useEffect(() => {
    Check()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imeKorisnika,open]);


  function Close(e) {
    let text = e.target.innerText;
    console.log(e.target.innerText);
    if (text === "Log-in") setOpen(!open);
    else {
      Dispatch(LogOut());
      setImeKorisnika("");
      localStorage.clear();
    }
  }
  function regularClose() {
    setOpen(!open);
  }
  return (
    <div className=" panel2">
      <Row className="w-100">
        <Col className=" flexGrowaj" xs={2}>
          <img className="slika visible" src={slika} alt="" />
        </Col>
        <Col>
          <Row>
            <Col className="redo flexGrowaj">
              <div className="d-flex flex-row    justify-content-start ">
                <p className="px-1-sm neki-text visible">Welcome Back: </p>
                <a className=" neki-text" href="/#">
                  {imeKorisnika}
                </a>
                <p className="px-2 neki-text visible">You Last Visited: </p>
                <p className="neki-text visible">Today 11:19pm </p>
              </div>
              <button onClick={(e) => Close(e)} className=" linkovi log-out">
                {logovan ? "Log-Out" : "Log-in"}
              </button>
              <CSSTransition  in={open} timeout={200} classNames="my-node"> 
              {/* //nodeRef={inputElement} */}
                <UserModal
                // ref={inputElement}
                  Close={(e) => Close(e)}
                  open={open}
                  korisnici={korisnik}
                  regularClose={regularClose}
                />
              </CSSTransition>
            </Col>
          </Row>
          <Row>
            <Col className="redo flexGrowaj">
              <div className="PrivateMessage-Flex   ">
                <Link to={"/Messages/Inbox"}>
                <i className="fas icon fa-envelope-open-text"></i>
                </Link>
                <a href="###" className="linkovi">
                  Inbox
                </a>
                <Link to={`/Messages/Send/${ID}`} >
                <i className="fas icon fa-paper-plane "></i></Link>
                <Link to={`/Messages/Send/${ID}`} className="linkovi marginas">
                  Send Private Messages
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfileArea;
