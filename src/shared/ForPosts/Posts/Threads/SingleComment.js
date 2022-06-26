import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "react-bootstrap";
import { Example } from "./reportModal";
import "./Comments.css";
const SingleComment = ({
  handleDelete,
  PostID,
  name,
  description,
  date,
  image,
  authorID,
  CommentID,
  handleQuoteComment,
  handleCommentEdit,
  currentPage,
}) => {
  let datum = date.substring(0, 10);
  let vreme = date.substring(11, 19);
  const [Edit, setEdit] = useState(false);
  const [Desc, setDesc] = useState(description);
  const [showValue, setShowValue] = useState(false);
  const logovan = useSelector((state) => state.users.isLoggedIn);
  var id = "";
  if (logovan) id = localStorage.getItem("id");
  function handleEdit() {
    setEdit(!Edit);
  }
  return (
    <>
      <Example
        showValue={showValue}
        openTheModal={setShowValue}
        ID={CommentID}
        TIP="COMMENT"
        pageNumber={currentPage}
        authorID={id}
        threadID={PostID}
      />
      <div className="Comments--Area">
        <div className="Comment--Author">
          <img className="mt-3 Author--Pic" src={`http://localhost:5000/${image}`} alt="greska"></img>
          <p className="Author--Info">{name}</p>
          <p className="Small--Time">
            {datum}
            {"\n"}
            {vreme}
          </p>
        </div>
        {!Edit ? (
          <div className="Comments">
            <p>{description}</p>
          </div>
        ) : (
          <>
            <textarea
              value={Desc}
              onChange={(e) => setDesc(e.target.value)}
              className="Comments"
            >
              {description}
            </textarea>

            <Button
              onClick={() => {
                handleCommentEdit(CommentID, Desc);
                handleEdit();
              }}
              variant="outline-success"
            >
              Edit
            </Button>
          </>
        )}
      </div>
      {id === authorID ? (
        <div className="Comment--Icon--Area">
          <i
            onClick={() => handleQuoteComment(description, name)}
            class="fa-solid fa-reply m-1 mx-3 "
          ></i>
          <i onClick={handleEdit} class="fa-solid fa-pen m-1"></i>
          <i
            onClick={() => handleDelete(PostID, authorID, CommentID)}
            class="fa-solid fa-trash-can m-1"
          ></i>{" "}
        </div>
      ) : (
        <div className="Comment--Icon--Area">
          <i
            onClick={() => handleQuoteComment(description, name)}
            class="fa-solid fa-reply m-1 mx-3 "
          ></i>
          <i
            onClick={() => setShowValue(true)}
            className="fa-solid fa-bullhorn m-1"
          ></i>
        </div>
      )}
    </>
  );
};

export default SingleComment;
