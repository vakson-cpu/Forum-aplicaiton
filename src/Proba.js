import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./Redux/Reducers/Slices";
import { getUsers } from "./Redux/Reducers/UserSlices";
// import { getInitial } from "./Redux/Reducers/Slices";
const Proba = () => {
  const dispatch = useDispatch();
  // dispatch(getPosts());
  const postovi = useSelector((state) => state.threads.Posts);
  const korisnik= useSelector((state)=>state.users.Users);
  console.log(postovi)
  console.log(korisnik)
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
    <p>
      {postovi.map(a=>a.title)}
      </p>
    </div>
  );
};

export default Proba;
