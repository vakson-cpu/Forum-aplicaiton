import React, { useState, useEffect } from "react";
import { Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MakePost } from "../../../Axy/axiosFunctions";
import "./CreatePost.css";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorID, setAuthorID] = useState("");
  const [Done, setDone] = useState(false);

  const Logged = useSelector((state) => state.users.isLoggedIn);
  const Tid = +useParams().Tid;

  const handlePostThread = async () => {
    if (Done === false) {
      console.log(
        `Title :${title} , description: ${description} authorID: ${authorID}`
      );
      try {
        await MakePost(
          authorID,
          title,
          description,
          Tid,
          Date().toLocaleString()
        );
        console.log("Uspesno poslat zahtev....");
        setDone(true);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    let ID = "";
    if (Logged) {
      ID = localStorage.getItem("id");
      setAuthorID(ID);
    }
  }, [Logged]);

  if (Logged)
    return (
      <div className="mt-5 w-75 m-auto Custom--Form">
        {Done === false ? (
          <>
            <label>Post Title</label>
            <input
              className="mt-3"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Content</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-3"
            ></textarea>{" "}
          </>
        ) : (
          <h1 className="text-center">POST HAS BEEN SUCCESSFULLY MADE</h1>
        )}
        <Link to={Done ? `/threads/${Tid}` : `/CreatePost/${Tid}`}>
          <Button
            onClick={() => handlePostThread()}
            className="mt-5  w-xs-75  PostThread--Button m-auto"
            variant="outline-info"
          >
            {Done ? "Go to Post Page" : "Post Thread"}
          </Button>
        </Link>
      </div>
    );
  else
    return (
      <div className="text-white text-center">
        You dont have The permission to view this page
      </div>
    );
};

export default CreatePost;
