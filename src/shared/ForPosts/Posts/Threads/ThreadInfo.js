import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
// import { getUsers } from "../../../../Redux/Reducers/UserSlices";
import { getPosts } from "../../../../Redux/Reducers/Slices";
import { Spinner } from "react-bootstrap";
import "./ThreadInfo.css";
import { viewPost } from "../../../Axy/axiosFunctions";
import { Example } from "./reportModal";

const ThreadInfo = () => {
  console.log("THREAD");

  //Ovde sam  fasho opasno
  const Pid = useParams().PostId; //Id posta

  console.log(Pid);

  const postovi = useSelector((state) => state.threads.Posts);
  const korisnici = useSelector((state) => state.users.Users);

  const [commentArea, setCommentArea] = useState("");
  const [showValue, setShowValue] = useState(false);
  const logged = useSelector((state) => state.users.isLoggedIn);
  const STATUS= useSelector(state=>state.threads.status)
  const userStatus= useSelector(state=>state.users.status)
  const [realUser, setRealUser] = useState({});
  const [author, setAuthor] = useState({});
  const [Post, setPost] = useState({});

  useEffect(() => {
    if (logged === true) {
      let pom = localStorage.getItem("id");
      let pomUser = korisnici.filter((a) => a._id === pom);
      if (pomUser.length > 0) setAuthor(pomUser[0]);
    }
  }, [logged]);

  useEffect(() => {
    if (postovi.length !== 0 && korisnici.length !== 0) {
      var post = postovi.filter((t) => t._id === Pid);
      console.log(post);
      setPost(post[0]);
      var User = korisnici.filter((U) => U._id === post[0].authorID);
      console.log("AUTHOR THREADA_A: ",realUser);
      setRealUser(User[0]);
    }
  }, [STATUS,userStatus]);

  const handleCommentArea = (a) => setCommentArea(a);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch(getUsers());
  //   dispatch(getPosts());
  // }, [dispatch]);

  useEffect(() => {
    viewPost(Pid);
  }, []);

  //Mako comments
  if (postovi.length !== 0 && korisnici.length !== 0 && STATUS==="success")
    return (
      <>
        <Example
          ID={Pid}
          openTheModal={setShowValue}
          showValue={showValue}
          TIP="THREAD"
          authorID={author._id}
          // pageNumber={currentPage}
        />

        <Container className="Board mt-5">
          <div className="User--Information">
            <div className="Side--Info">
              <div className="User--Img">
                <img className="Pic" src={realUser.image} alt={"No img"}></img>
              </div>
              <div className="User--Name">{realUser.name}</div>
              <div className="User--Name">Account Created: {realUser.date}</div>
            </div>
            <div className="Thread--Panel">{<p>{Post.description}</p>}</div>
          </div>
          <div className="Thread--Footer">
            <i className="fas fa-times-circle"></i>
            <i
              onClick={() => setShowValue(true)}
              className="fas fa-bullhorn"
            ></i>
            <i className="fas fa-times-circle"></i>
          </div>
        </Container>
        <Container className="mt-5">
          <Comments
            handleCommentArea={handleCommentArea}
            vrednost1={commentArea}
            Pid={Pid}
          />
        </Container>
        <Container className="mt-5">
          <div className="PostComment--Area">
            <textarea
              value={commentArea}
              onChange={(e) => setCommentArea(e.target.value)}
              className="CreateComment"
              rows="30"
            ></textarea>
          </div>
        </Container>
      </>
    );
  else
    return (
      <div className="Spinner--Center">
        <Spinner animation="border" variant="danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
};

export default ThreadInfo;
