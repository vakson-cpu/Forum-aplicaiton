import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ReactDom from "react-dom";
import "./ThreadModal.css";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { PostThread } from "../../../Redux/Actions/PostThread";

const ThreadModal = ({ open, onClose, Tid }) => {
  const [title1, settitle1] = useState("");
  const [description1, setdescription1] = useState("");
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    replies: 0,
    description: "",
    date: "11 04 2002",
    Tid: Tid,
    authorID: 1,
    postID: uuid(),
  });

   const setHandler=()=> {
     setData((prevData) => {
      prevData = { ...prevData, title: title1, description: description1 };
      return prevData;
    });
  }
  const submitHandler = (e) => {
      let pomocni=data;
      setHandler();
      pomocni.title=title1;
      pomocni.description=description1;
      dispatch(PostThread(pomocni));
      e.preventDefault();
      onClose();
    
  };
  const descriptionHandler = (event) => {
    setdescription1(event.target.value);
  };
  const titleHandler = (event) => {
    settitle1(event.target.value);
  };
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="form"
      >
        <h1 className="Title">Create thread</h1>
        <input
          className="input--text"
          type="text"
          placeholder="Thread Title"
          value={title1.value}
          onChange={titleHandler}
        ></input>
        <textarea
          className="input--textarea"
          placeholder="Thread content"
          value={description1.value}
          onChange={descriptionHandler}
        />
        <Button type="submit">Submit</Button>
      </form>
      <div onClick={onClose} className="behind"></div>

    </>,
    document.getElementById("postThread")
  );
};

export default ThreadModal;
