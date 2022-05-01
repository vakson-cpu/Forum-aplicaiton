import React from "react";
import { Link } from "react-router-dom";
import "./SinglePost.css";
const SinglePost = ({
  name,
  title,
  replies,
  time,
  PostId,
}) => {
  return (
    <div className="PostContainer">
      <div className="UserInfo">
        <i className="fas fa-users"></i>
        <div className="UserInfo--main">
          <Link className="UserInfo--Link" to={`/threads/info/${PostId}/1`}>{title}</Link>
          <p className="UserInfo--text" >Posted by: {name}</p>
        </div>
      </div>
      <div className="PostInfo invisible1">
        <p>Number of Replies{replies}</p>
      </div>

      <div className="latest invisible1">
        <p>{time}</p>
        <p>Player xxx commented</p>
      </div>
    </div>
  );
};

export default SinglePost;
