import { Navigacija } from "./shared/UI/Navigacija";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import "./App.css";
import { Home } from "./pages/Home";
import Footer from "./shared/UI/Futer/Footer";
import Parea from "./shared/UI/ProfileArea/Parea";
import Bottom from "./shared/UI/Futer/Bottom";
import Thread from "./pages/Thread";
import ThreadInfo from "./shared/ForPosts/Posts/Threads/ThreadInfo";
// import Proba from "./Proba";
const App = () => {
  console.log("POCETNA")
  return (
    <>
      <Router>
        <Navigacija />
        <Parea />

        <Routes>
          <Route path='/'  element={<Home />} />
          <Route path="/about"  element={<About/>} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/threads/:userId"  element={<Thread/>} />
          <Route path="/threads/info/:PostId/:page"  element={<ThreadInfo />} />

        </Routes>

        <Footer />
        <Bottom />
      </Router>
    </>
  );
};

export default App;
