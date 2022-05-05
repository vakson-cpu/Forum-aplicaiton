import React from "react";
import "./Comments.css";
const SingleComment = ({handleDelete,PostID, name, description, date, image,authorID,CommentID }) => {
  let datum = date.substring(0, 10);
  let vreme = date.substring(11, 19);

  // const handleDeleteComment=()=>{
//THE QUESTION IS IF I SHOULD REALLY DELETE THIS HERE, I WANT TO CAUSE STATE RENDERING, SHOULD I PASS IT AS PROP?
//OR LEAVE IT LIKE THIS,THE QUESTION REMAINS.
//I SUGGEST TO LEAVE IT LIKE THEES
  // }
  return (
    <>
      <div className="Comments--Area">
        <div className="Comment--Author">
          <img className="mt-3 Author--Pic" src={image} alt="greska"></img>
          <p className="Author--Info">{name}</p>
          <p className="Small--Time">
            {datum}
            {"\n"}
            {vreme}
          </p>
        </div>
        <div className="Comments">
          <p>{description}</p>
        </div>
      </div>
      <div className='Comment--Icon--Area'>
      <i  class="fa-solid fa-reply m-1 mx-3 "></i>
      <i className="fa-solid fa-bullhorn m-1"></i>
      <i class="fa-solid fa-pen m-1"></i>
         <i onClick={()=>handleDelete(PostID,authorID,CommentID)} class="fa-solid fa-trash-can m-1"></i>     </div>
    </>
  );
};

export default SingleComment;
