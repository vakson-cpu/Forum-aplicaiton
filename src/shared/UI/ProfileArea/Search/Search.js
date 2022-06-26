import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Search.css";
import SearchPageResult from "./SearchPageResults";
const Search = () => {
  const [Tip, setTip] = useState(true);
  const [views, setViews] = useState(0);
  const [Title, setTitle] = useState("");
  const [Asc, setAsc] = useState(true);
  const Users = useSelector((state) => state.users.Users);
  const Threads = useSelector((state) => state.threads.Posts);
  const [Lista, setLista] = useState([])
  const [search, setSearch] = useState(false);

  
  const handleSearch = () => {
    let Niz = [];
    if (Title) {
      Niz = Threads.filter((a) => {
        const regex = new RegExp(`${Title}`, "gi");
        return a.title.match(regex);
      });
      console.log(Niz);
      setSearch(true);
      setLista(Niz);
    }
  };
  
  return (
    <div className="text-white d-flex flex-column justify-content-center">
      <h3 className="text-white text-center">What are you searching?</h3>
      <select
        onChange={() => {
          setTip(!Tip);
        }}
        className="w-50 m-auto"
        name="search"
        id="search_type"
      >
        <option>Posts</option>
        <option>Users</option>
      </select>
      {Tip ? (
        <div>
          <div className="Search--Options  text-center">
            <label className="my-3">Search by post Name: </label>
            <input
              className=" mx-3  "
              type="text"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Search for shit..."
            ></input>
            <label>Search by post view count:</label>
            <input
              className="mx-3 my-3 "
              type="text"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              placeholder=""
            ></input>
            <div>
              <label>More than:</label>

              <input
                onChange={() => {
                  setAsc(true);
                }}
                className="mx-3 "
                type="radio"
                name="rg"
              ></input>
              <label>Less than</label>
              <input
                onChange={() => {
                  setAsc(false);
                }}
                className="mx-3 "
                NAME="rg"
                type="radio"
              ></input>
            </div>

              <Button onClick={handleSearch} variant="outline-light">
                Search
              </Button>
          </div>
          {search && <SearchPageResult postovi={Lista} />}
        </div>
      ) : (
        <>
          <h1>NOTHING</h1>
        </>
      )}
    </div>
  );
};

export default Search;
