import React from "react";
import { Link } from "react-router-dom";
import "./UpPanel.css";
const UpPanel = () => {
  return (
    <div className="panel">
        <div className="box ">
          <div className="d-flex flex-row vis  align-items-center ">
            <Link to="/Search">
            <p className=" px-3 pt-3 text-warning font-weight-bold "  > Search
            
            </p> </Link>
          
          </div>
          <div className=" px-5 d-flex flex-row align-items-center">
            <i className=" iconz visible fas fa-question font-weight-bold "></i>
            <p className="px-3 pt-3  text-warning font-weight-bold"> Help</p>
          </div>
        </div>
        </div>
  );
};

export default UpPanel;
