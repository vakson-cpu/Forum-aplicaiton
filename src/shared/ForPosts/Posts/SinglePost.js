import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./SinglePost.css";
const SinglePost = ({
  name,
  title,
  replies,
  time,
  PostId,
  views
}) => {
  // const [TITLE, setTITLE] = useState("");;
  let TITLE=title;
  if(title.length>10){
    TITLE=title.slice(0,10)+"...";

  }
  return (
    <div className="PostContainer">
      <div className="UserInfo">
        <i className="fas fa-users"></i>
        <div className="UserInfo--main">
          <Link className="UserInfo--Link" to={`/threads/info/${PostId}/1`}>{TITLE}</Link>
          <p className="UserInfo--text" >Posted by: {name}</p>
        </div>
      </div>
      <div className="PostInfo invisible1 text-center ">
        <p>Number of Replies: {replies}</p>
      </div>

      <div className="latest invisible1 ">
        <p>{time}</p>
        <p clasName='my-3'>views:{views}</p>
      </div>
    </div>
  );
};

export default SinglePost;
