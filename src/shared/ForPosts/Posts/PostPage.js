import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../Redux/Reducers/UserSlices";
import { Container, Button } from "react-bootstrap";
import SinglePost from "./SinglePost";
import "./PostPage.css";
import ThreadModal from "./ThreadModal";
import { CSSTransition } from "react-transition-group";
import { getPostByTid } from "../../../Redux/Reducers/Slices";
import "./animacija.css";
import { Spinner } from "react-bootstrap";
import uuid from "react-uuid";
// import { PostThread } from "../../../Redux/Actions/PostThread";

const PostPage = ({ Pid }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onClose = () => {
    setOpen(false);
  };

  const postovi = useSelector((state) => state.threads.PostsByTid);
  const korisnici = useSelector((state) => state.users.Users);

  useEffect(() => {
    console.log("Pozvan je useEffect,rendering");
    dispatch(getUsers());
    dispatch(getPostByTid(Pid));
  }, [dispatch]);
  
  function Filtriraj(authorID) {
    let kor = korisnici.filter((a) => a._id === authorID);
    return kor[0].name;
  }
  if (postovi.length > 0)
    return (
      <>
        <CSSTransition in={open} timeout={24} unmountOnExit classNames="alert">
          <ThreadModal onClose={onClose} open={open} Tid={+Pid} />
        </CSSTransition>
        <Container className="mt-5">
          <Button
            onClick={() => {
              setOpen(!open);
            }}
            variant="outline-info"
            className="button--position"
          >
            Make Thread
          </Button>{" "}
          {postovi.map((D) => (
            <SinglePost
              key={uuid()}
              PostId={D._id}
              name={Filtriraj(D.authorID)} //Trebalo bi da rad
              title={D.title}
              time={D.date}
              replies={D.replies}
            />
          ))}
        </Container>
      </>
    );
    else return (      <div className="Spinner--Center">
    <Spinner animation="border" variant="danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>)
};

export default PostPage;
