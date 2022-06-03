import React, { useEffect } from "react";

import { Navigacija } from "./shared/UI/Navigacija";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import "./App.css";
import SendPrivateMessage from "./shared/User/UserProfile/Messages/SendPrivateMessage";
import { Home } from "./pages/Home";
import Footer from "./shared/UI/Futer/Footer";
import Parea from "./shared/UI/ProfileArea/Parea";
import Bottom from "./shared/UI/Futer/Bottom";
import Thread from "./pages/Thread";
import ThreadInfo from "./shared/ForPosts/Posts/Threads/ThreadInfo";
import UserProfileInfo from "./shared/User/UserProfile/UserProfileInfo";
import { useSelector, useDispatch } from "react-redux";
import { LogInuj } from "./Redux/Reducers/UserSlices";
import { getUsers } from "./Redux/Reducers/UserSlices";

import Inbox from "./shared/User/UserProfile/Messages/Inbox";
import { SMTP } from "./shared/Axy/axiosFunctions";
import PM from "./shared/User/UserProfile/Messages/MessageDetail/PM";
import CreatePost from "./shared/ForPosts/Posts/Threads/CreatePost";
// import Proba from "./Proba";

const App = () => {
  const dispatch = useDispatch();
  const logovan = useSelector((state) => state.users.isLoggedIn);
  
  useEffect(() => {
    if (localStorage.length > 0) {
      dispatch(LogInuj());
      dispatch(getUsers())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logovan]);

  console.log("POCETNA");
  return (
    <>
      <Router>
        <Navigacija />
        <Parea />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/threads/:Tid" element={<Thread />} />
          <Route path="/threads/info/:PostId/:page" element={<ThreadInfo />} />
          <Route path="/User/:name" element={<UserProfileInfo />} />
          <Route path="/Messages/Send" element={<SendPrivateMessage />} />
          <Route path="/Messages/Inbox" element={<Inbox/>} />
          <Route path="/Messages/Message/:MessageID" element={<PM/>}/>
          <Route path="/CreatePost/:Tid"  element={<CreatePost />}/>
        </Routes>

        <Footer />
        <Bottom />
      </Router>
    </>
  );
};

export default App;
