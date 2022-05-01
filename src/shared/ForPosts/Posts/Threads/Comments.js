import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import "./Comments.css";
import {  Spinner } from "react-bootstrap";
import uuid from "react-uuid";

import { getCommentsByPost } from "../../../Axy/axiosFunctions";
import Paginacija from "./Paginacija";

const Comments = ({ Pid,Semafor }) => {
  console.log("COMMENTS")
  console.log("INICIJALNI PAGE PRE PARSANJA JE: ",useParams().page)
  const Page = parseInt(useParams().page); //Id posta
  const Authors = useSelector((state) => state.users.Users); //
  const [Komentari, setComments] = useState([]);
  const [loading, setloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(Page);
  const [Count, setCount] = useState(0);  
  console.log("TRENUTNI Page JE: ",currentPage);
  async function fechaj(Pid,currentPage) {
    setloading(true);
    let a = await getCommentsByPost(Pid,currentPage);
    setComments(a.Comment);
    setCount(a.Quantity)
    console.log(Komentari);
    setloading(false);
  }
  useEffect(() => {
    // console.log("UseEffect, Tr str",currentPage-1);
    setCurrentPage(Page);
    fechaj(Pid,currentPage-1);
    console.log("POZVAN JE FECHING u use")
    return ()=>{
      setComments([])
    }
  }, [Semafor]);

  function paginate(number){
    console.log("PAGINATE")
    setCurrentPage(number-1)
    console.log("Paginate Tr str",number-1);
    fechaj(Pid,number-1);
  }
  function Filter(authorID, numb) {
    let niz = Authors.filter((a) => a._id === authorID);
    if (numb === 1) return niz[0].image;
    else return niz[0].name;
  }

  if (loading === false)
    return (
      <>

        <div className="Comment--List">
          {Komentari.map((p) => (
            <SingleComment
              key={uuid()}
              name={Filter(p.authorID, 0)}
              image={Filter(p.authorID, 1)}
              description={p.description}
              date={p.time}
            />
          ))}
        </div>

        <Paginacija Semafor={Semafor} paginate={paginate} postsPerPAge={5} totalPosts={Count} />
        
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
