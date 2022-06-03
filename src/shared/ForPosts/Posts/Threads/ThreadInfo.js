import React, { useEffect,useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { getUsers } from "../../../../Redux/Reducers/UserSlices";
import { getPosts } from "../../../../Redux/Reducers/Slices";
import { Spinner } from "react-bootstrap";
import "./ThreadInfo.css";

const ThreadInfo = () => {
  console.log("THREAD")

  //Ovde sam  fasho opasno
  const Pid = useParams().PostId; //Id posta

  console.log(Pid);
  const postovi = useSelector((state) => state.threads.PostsByTid);
  const korisnici = useSelector((state) => state.users.Users);
  const [commentArea, setCommentArea] = useState("")

  if (postovi.length !== 0 && korisnici.length !== 0) {
    var Post = postovi.filter((t) => t._id === Pid);
    console.log(Post);
    var User = korisnici.filter((U) => U._id === Post[0].authorID);
    var Lnk = User[0].image;
  }



  const handleCommentArea=(a)=>setCommentArea(a)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch])
  //Mako comments
  if (postovi.length !== 0 && korisnici.length !== 0)
    return (
      <>
        <Container className="Board mt-5">
          <div className="User--Information">
            <div className="Side--Info">
              <div className="User--Img">
                <img
                  className="Pic"
                  src={Lnk}
                  alt={`Link je : ${User[0].image}`}
                ></img>
              </div>
              <div className="User--Name">{User[0].name}</div>
              <div className="User--Name">Account Created: {User[0].date}</div>
            </div>
            <div className="Thread--Panel">{<p>{Post[0].description}</p>}</div>
          </div>
          <div className="Thread--Footer">
            <i className="fas fa-times-circle"></i>
            <i className="fas fa-bullhorn"></i>
            <i className="fas fa-times-circle"></i>
            <i className="fas fa-times-circle"></i>
          </div>
        </Container>
        <Container className="mt-5">
          <Comments handleCommentArea={handleCommentArea} vrednost1={commentArea} Pid={Pid} />

        </Container>
        <Container className="mt-5">
          <div className="PostComment--Area">

            <textarea value={commentArea} onChange={e=>setCommentArea(e.target.value)} className="CreateComment" rows="30"></textarea>
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
