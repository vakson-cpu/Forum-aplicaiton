import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Redux/Reducers/UserSlices";
import { Container, Button } from "react-bootstrap";
import SinglePost from "./SinglePost";
import "./PostPage.css";
import { getPostByTid } from "../../../Redux/Reducers/Slices";
import "./animacija.css";
import { Spinner } from "react-bootstrap";
import uuid from "react-uuid";
import { getPostsByTableId } from "../../Axy/axiosFunctions";
import { Link } from "react-router-dom";
// import { PostThread } from "../../../Redux/Actions/PostThread";

const PostPage = ({ Pid }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  // const postovi = useSelector((state) => state.threads.PostsByTid);
  const [postovi, setPostovi] = useState([]);
  const korisnici = useSelector((state) => state.users.Users);

  // const isLoading = useSelector((state) => state.threads.status4Tid);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("Pozvan je useEffect,rendering");
    async function helperfunc() {
      let pom = await getPostsByTableId(Pid);
      setPostovi(pom);
      setIsLoading(true);
      console.log("DOBIJENO JE ",pom);
    }
    if (isLoading===false) helperfunc();
  }, [isLoading]);

  function GetTheTime(time) {
    let newTime = time.slice(0, 10);
    return newTime;
  }

  function Filtriraj(authorID) {
    let kor = korisnici.filter((a) => a._id === authorID);
    return kor[0].name;
  }
  if (isLoading) {
    if (postovi.length>0 && korisnici.length >0)
      return (
        <>
          {/* <CSSTransition
            in={open}
            timeout={24}
            unmountOnExit
            classNames="alert"
          >
            <ThreadModal onClose={onClose} open={open} Tid={+Pid} />
                      <Container className="mt-5">

          </CSSTransition>
            <Button
              onClick={() => {
                setOpen(!open);
              }}
              variant="outline-info"
              className="button--position"
            >
              Make Thread
            </Button>{" "} */}
          <Container className="mt-5">
            <Link to={`/CreatePost/${Pid}`}>
              <Button className="float-end mx-5 my-4" variant="outline-info">
                CREATE POST
              </Button>
            </Link>

            {postovi.map((D) => (
              <SinglePost
                key={uuid()}
                PostId={D._id}
                name={Filtriraj(D.authorID)} //Trebalo bi da rad
                title={D.title}
                time={GetTheTime(D.time)}
                replies={D.replies}
                views={D.views}
                //Meni fali sad ovde neko ime poslednjeg odgovora...
              />
            ))}
          </Container>
        </>
      );
    else
      return (
        <>
          <h1 className="text-center text-white">NEMA TRENUTNO POSTOVA</h1>
          <Link to={`/CreatePost/${Pid}`}>
            <Button className="float-end mx-5" variant="outline-info">
              CREATE POST
            </Button>
          </Link>
        </>
      );
  } else {
    return (
      <div className="Spinner--Center">
        <Spinner animation="border" variant="danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
};

export default PostPage;
