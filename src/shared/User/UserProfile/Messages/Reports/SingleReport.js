import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../SingleMessage.css";

const SingleReport = ({title, authorID, reportID }) => {
  const Users = useSelector((state) => state.users.Users);
  const [User, setUser] = useState({});
  let user = Users.filter((a) => a._id === authorID);
  useEffect(() => {
    if (user.length > 0) setUser(user[0]);
  }, []);

  return (
    <div className="mx-2   px-0 text-black">
      <Row className="border mx-0 px-0 Padding">
        <Col className="border text-center" xs={1}>
          <i class="fa-solid fa-triangle-exclamation"></i>{" "}
        </Col>
        <Col className="border">
          <Link
            className="Message--Link--Colors"
            to={`/ReportInfo/${reportID}`}
          >
            {title}
          </Link>
        </Col>
        <Col className="border">{User.name || "?"}</Col>
      </Row>
    </div>
  );
};

export default SingleReport;
