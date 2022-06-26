import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button } from "react-bootstrap";
import SinglePost from "../../../ForPosts/Posts/SinglePost";
import "../../../ForPosts/Posts/PostPage.css";
import { Spinner } from "react-bootstrap";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
// import { PostThread } from "../../../Redux/Actions/PostThread";

const SearchPageResult = ({ postovi }) => {
  const isLoading = useSelector((state) => state.threads.status);
  const korisnici = useSelector((state) => state.users.Users);
 console.log("primljen niz je: ",postovi);
  function GetTheTime(time) {
    let newTime = time.slice(0, 10);
    return newTime;
  }

  function Filtriraj(authorID) {
    let kor = korisnici.filter((a) => a._id === authorID);
    return kor[0].name;
  }
    if (postovi.length > 0)
      return (
        <>
          <h3 className="text-center text-white ">Search Results: </h3>
          <Container className="mt-5">
            {postovi.map((D) => (
              <SinglePost
                key={uuid()}
                PostId={D._id}
                name={Filtriraj(D.authorID)} //Trebalo bi da rad
                title={D.title}
                time={GetTheTime(D.time)}
                replies={D.replies}
                views={D.views}
                //Meni fali sad ovde neko ime poslednjeg odgovora...
              />
            ))}
          </Container>
        </>
      );
    else
      return (
        <>
          <h3 className="text-center text-white ">Search Results: </h3>

          <h3 className="text-center text-white">0 Matches found..</h3>
        </>
      );
  } 

  

export default SearchPageResult;
