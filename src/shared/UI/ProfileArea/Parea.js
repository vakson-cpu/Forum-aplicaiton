import React from "react";
import UpPanel from "./UpPanel";
import UserProfileArea from "./UserProfileArea";
import "./UpPanel.css";
const Parea = () => {
  console.log("PAREA")

  return (
      <div className='w-100'>
        <div className='d-flex flex-column  w-100'>
        <UpPanel />
        <UserProfileArea />
        </div>
      </div>
  );
};

export default Parea;
