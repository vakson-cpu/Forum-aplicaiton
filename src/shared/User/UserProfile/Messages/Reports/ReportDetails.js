import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getReportById } from "../../../../Axy/axiosFunctions";
import './RD.css'
//PM CE DA iMA TEXT PORUKE I DESCRIPTION
const ReportDetails = () => {
  let reportID = useParams().reportID;

  console.log("ReportID", reportID);
  const Users = useSelector((state) => state.users.Users);

  const [Report, setReport] = useState({});
  const [name, setName] = useState("");
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function Prikupi() {
      let pom = await getReportById(reportID);
      setReport(pom);
      //Ovo more da fejla
      console.log("Pretraga... ", pom.authorID);
      let pomUser = Users.filter((a) => a._id === pom.authorID);
      console.log("PomUserJe,", pomUser);
      setName(pomUser[0].name);
      setLoading(false);
    }
    Prikupi();
  }, []);
  if (Loading === false)
    return (
      <div className="bg-black w-75 m-auto mt-5">
        <div className="w-100 border border-2 border-light">
          <h4  className="text-white p-md-3 border-bottom border-warning" >{Report.title}</h4>
          <p className="text-secondary p-md-3 borderType ">
            A Report from: {name}
          </p>
          <h6 className="text-white p-md-3">Report </h6>
          <p className="text-white   p-md-3">
            Description: {Report.description}{" "}
          </p>
          <Link  className="GOTO"
            to={
              Report.reportType === "COMMENT"
                ? `/threads/info/${Report.postID}/${Report.pageNumber}`
                : `Report/ReportInfo/${Report.postID}/1}`
            }
          >
            <p className="GOTO  m-xl-3">Go to reported {Report.reportType}</p>
          </Link>
        </div>
      </div>
    );
  else return <div>Loading...</div>;
};

export default ReportDetails;
