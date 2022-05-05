import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import "./Comments.css";
import { Spinner } from "react-bootstrap";
import uuid from "react-uuid";
import { deleteComments, writeComment } from "../../../Axy/axiosFunctions";
import { getCommentsByPost } from "../../../Axy/axiosFunctions";
import Paginacija from "./Paginacija";
import { Button } from "react-bootstrap";

const Comments = ({ Pid, Semafor, vrednost1 }) => {
  console.log("COMMENTS");
  console.log("INICIJALNI PAGE PRE PARSANJA JE: ", useParams().page);
  const Page = parseInt(useParams().page); //Id posta

  const Authors = useSelector((state) => state.users.Users); //
  const [Komentari, setComments] = useState([]);
  const [loading, setloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(Page);
  const [Count, setCount] = useState(0);
  console.log("TRENUTNI Page JE: ", currentPage);

  async function handleDelete(postID, authorID, CommentID) {
    let rezultat = await deleteComments(postID, authorID, CommentID);
    console.log("USPESNO JE OBRISANO:", rezultat);
    setComments(Komentari.filter((a) => a._id !== rezultat._id));
  }

  async function fechaj(Pid, currentPage) {
    setloading(true);
    let a = await getCommentsByPost(Pid, currentPage);
    setComments(a.Comment);
    setCount(a.Quantity);
    console.log("KVANITITET JE:", Count);
    console.log(Komentari);
    setloading(false);
  }
  useEffect(() => {
    // console.log("UseEffect, Tr str",currentPage-1);
    setCurrentPage(Page);
    fechaj(Pid, currentPage - 1);
    return () => {
      setCurrentPage(Page);
      setComments([]);
    };
  }, []);

  function paginate(number) {
    setCurrentPage(number - 1);
    console.log("Paginate Tr str", number - 1);
    fechaj(Pid, number - 1);
  }
  function Filter(authorID, numb) {
    console.log("AUTORI SU", Authors);
    let niz = Authors.filter((a) => a._id === authorID);
    if (numb === 1) return niz[0].image;
    else return niz[0].name;
  }

  async function handlePostComment() {
    let authorID = localStorage.getItem("id");
    let rezultat = await writeComment(authorID, vrednost1, Pid);
    console.log("Uspesno je odradjeno: ", rezultat);
    console.log("KOMENTARI SU: ", Komentari);
    setComments([...Komentari, rezultat]);
    if (Comment.length > 5) fechaj(Pid, Page);
    fechaj(Pid, Page - 1);
  }

  if (loading === false)
    return (
      <>
        <div className="Comment--List">
          {Komentari.map((p) => (
            <SingleComment
              handleDelete={handleDelete}
              key={uuid()}
              PostID={Pid}
              name={Filter(p.authorID, 0)}
              image={Filter(p.authorID, 1)}
              description={p.description}
              date={p.time}
              authorID={p.authorID}
              CommentID={p._id}
            />
          ))}
        </div>
        <Paginacija
          Semafor={Semafor}
          paginate={paginate}
          postsPerPAge={5}
          totalPosts={Count}
        />
        <Button
          onClick={() => handlePostComment()}
          className="Comment--Button"
          variant="outline-info"
        >
          Post Comment
        </Button>{" "}
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

export default Comments;
