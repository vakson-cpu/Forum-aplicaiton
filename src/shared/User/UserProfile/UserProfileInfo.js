import React, { useEffect, useState } from "react";
import {  Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserByID } from "../../Axy/axiosFunctions";
import "./UserProfileInfo.css";
//    ____________
//      Name                                                   l           l
//      Registration Date                                      l           l
//      Total Number of Posts                                  l           l
//      Email: vakson12@gmail.com                              l___________l
//
//      Send Private Message
// BIOGRAPHY

const UserProfileInfo = () => {
  const logovan = useSelector((state) => state.users.isLoggedIn);
  const [Korisnik, setKorisnik] = useState({});

  useEffect(() => {
    Check();

  }, []);
  async function Check() {
    if (logovan) {
      let kor = await getUserByID(localStorage.getItem("id"));
      setKorisnik(kor.user);
    }
  }
  return (
    <>
      <div className=" mt-5 mx-3 Parent">
        <Row>
          <Col>
            <div className="User--Profile--Details">
              <Row>
                <Col>
                  <div className="User--Profile--Details--Inner">
                    <p>Name:{Korisnik.name}</p>
                    <p>LastName E</p>
                    <p>Total Number Of Posts</p>
                    <p>Email: {Korisnik.email}</p>
                  </div>
                </Col>
                <Col xs={8}>
                  <img
                    alt="greska"
                    className="User--Profile--Info--Pic"
                    src={Korisnik.image}
                  ></img>
                </Col>
              </Row>
            </div>
            <div className="m-3  Button-right ">
              <Link className="User--Profile--Inbox " to="#">
                Check Your Inbox
              </Link>
            </div>
          </Col>
          <Col xs={12} md={6}>
            {/* <h4 className="  text-white">User Bio...</h4> */}
            <div className="User--Biography">
              <p>Lorem Ipsum Sorem checskum</p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserProfileInfo;
