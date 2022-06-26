import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageUpload from "../../../FileUpload/ImageUpload";
import { changeUserBio, getUserByID } from "../../Axy/axiosFunctions";
import "./UserProfileInfo.css";
//    ____________                                             l------------l
//      Name                                                   l  r  s    r l
//      Registration Date                                      l   o   o o  l
//      Total Number of Posts                                  l   d  z o  ol
//      Email: vakson12@gmail.com                              l__s_____o___l
//
//      Send Private Message
// BIOGRAPHY

const UserProfileInfo = () => {
  const logovan = useSelector((state) => state.users.isLoggedIn);
  const [Korisnik, setKorisnik] = useState({});
  const [Edit, setEdit] = useState(false);
  const [Bio, setBio] = useState("");
  const [image, setImage] = useState("");
  console.log("Korisnik je: ", Korisnik);
  useEffect(() => {
    Check();
  }, [logovan]);
  async function Check() {
    if (logovan) {
      console.log("ovde je");
      let kor = await getUserByID(localStorage.getItem("id"));
      setKorisnik(kor.user);
      setImage(kor.user.image)
    }
  }
  async function ChangeBio() {
    await changeUserBio(Korisnik._id, Bio);
    setKorisnik({ ...Korisnik, bio: Bio });
  }

  if (
    Korisnik !== null &&
    Korisnik !== undefined &&
    logovan === true &&
    Korisnik.posts !== undefined
  )
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
                      <p>Total Number Of Posts:{Korisnik.posts.length}</p>
                      <p>Email: {Korisnik.email}</p>
                    </div>
                  </Col>
                  <Col xs={8}>
                    <img
                      alt="greska"
                      className="mx-2 User--Profile--Info--Pic"
                      src={`http://localhost:5000/${image}`}
                    ></img>
                  </Col>
                </Row>
                <ImageUpload  image={image} setImage={setImage} />
              </div>
              {/* <div className="m-3  Button-right ">
              <Link className="User--Profile--Inbox " to="#">
                Check Your Inbox
              </Link>
            </div> */}
            </Col>
            <Col xs={12} md={6}>
              {/* <h4 className="  text-white">User Bio...</h4> */}
              {!Edit ? (
                <>
                  <div className="User--Biography">
                    <p>{Korisnik.bio}</p>
                  </div>
                  <i
                    onClick={() => setEdit(!Edit)}
                    class=" float-end mt-1 fa-solid fa-pen-to-square"
                  ></i>
                </>
              ) : (
                <>
                  <textarea
                    className="User--Biography"
                    value={Bio}
                    onChange={(e) => setBio(e.target.value)}
                  >
                    {Korisnik.bio}
                  </textarea>
                  <Button
                    onClick={() => {
                      ChangeBio();
                      setEdit(false);
                    }}
                    variant="outline-success"
                    className="mt-2"
                  >
                    Save
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </div>
      </>
    );
  else return <h1>Loading...</h1>;
};

export default UserProfileInfo;
