import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import "./Comments.css";
import { Spinner } from "react-bootstrap";
import uuid from "react-uuid";
import {
  deleteComments,
  editComment,
  writeComment,
} from "../../../Axy/axiosFunctions";
import { getCommentsByPost } from "../../../Axy/axiosFunctions";
import Paginacija from "./Paginacija";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Comments = ({ Pid, Semafor, vrednost1, handleCommentArea }) => {
  console.log("COMMENTS");
  console.log("INICIJALNI PAGE PRE PARSANJA JE: ", useParams().page);
  const Page = parseInt(useParams().page); //Id posta
  const Navigate = useNavigate();
  const Authors = useSelector((state) => state.users.Users); //
  const [Komentari, setComments] = useState([]);
  const [loading, setloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(Page || 1);
  const [Count, setCount] = useState(0);
  const [Edit, setEdit] = useState(false);

  console.log("TRENUTNI Page JE: ", currentPage);

  async function handleDelete(postID, authorID, CommentID) {
    let rezultat = await deleteComments(postID, authorID, CommentID);
    console.log("USPESNO JE OBRISANO:", rezultat);
    setComments(Komentari.filter((a) => a._id !== rezultat._id));
  }

  async function fechaj(Pid, Page) {
    setloading(true);
    setCurrentPage(Page);
    let a = await getCommentsByPost(Pid, Page);
    if (a.length === 0) return;
    setComments(a.Comment);
    setCount(a.Quantity);
    console.log(Komentari);
    setloading(false);
  }
  useEffect(() => {
    fechaj(Pid, currentPage - 1);
  }, []);

  function paginate(number) {
    setCurrentPage(number - 1);
    console.log("Paginate Tr str", number - 1);
    fechaj(Pid, number - 1);
  }
  function Filter(authorID, numb) {
    let niz = Authors.filter((a) => a._id === authorID);
    if (numb === 1) return niz[0].image;
    else return niz[0].name;
  }

  async function handlePostComment() {
    setloading(true);
    try {
      let authorID = localStorage.getItem("id");
      let rezultat = await writeComment(authorID, vrednost1, Pid);
      console.log("Uspesno je odradjeno: ", rezultat);
      console.log("KOMENTARI SU: ", Komentari);

      let Broj = Math.ceil(Count / 5);
      if (Komentari.length >= 5) {
        Broj += 1;
        setCurrentPage(Broj);
      }
      Navigate(`/threads/info/${Pid}/${Broj}`);
      console.log("BR JE : ", Broj);
      setCurrentPage(Broj);

      fechaj(Pid, Broj - 1);
      setComments([...Komentari, rezultat]);
      setloading(false);
      window.scrollTo(0, 0);

      console.log("BROJ JE : ", Broj);
    } catch (err) {
      console.log(err);
    }
    console.log("redirecting...");
  }

  function handleQuoteComment(description, author) {
    console.log(description);
    let text = `"${author} je rekao:  ${description} "`;
    handleCommentArea([...vrednost1, text]);
  }

  async function handleCommentEdit(commentID, Desc) {
    console.log(`Pristigli CommentID: ${commentID} a desc : ${Desc}` );
    await editComment(commentID, Desc);
    await fechaj(Pid,currentPage)
    console.log("edited successfuly..");
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
              handleQuoteComment={handleQuoteComment}
              handleCommentEdit={handleCommentEdit}
              currentPage={currentPage}
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
