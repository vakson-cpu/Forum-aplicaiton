import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getReports } from "../../../../Axy/axiosFunctions";
import "../SingleMessage.css";
import SingleReport from "./SingleReport";
const Reports = () => {
  const Users = useSelector((state) => state.users.Users);
  const logged = useSelector((state) => state.users.isLoggedIn);
  const [User, setUser] = useState({});
  const [listReport, setListReport] = useState([]);

  useEffect(() => {
    if (logged === true) {
      let pomID = localStorage.getItem("id");
      console.log(pomID)
      console.log("Users",Users)
      let users = Users.filter((a) => a._id === pomID);
      console.log("Moderator:",users)
      if (users.length > 0) setUser(users[0]);
    }
  }, [logged]);

  useEffect(() => {
    async function fetchData() {
      let rezultat = await getReports();
      setListReport(rezultat.reverse());
    }
    fetchData();
  }, []);
  if (User.Tip === "M")
    return (
      <div className="Messages--List--Frame mt-5  ">
        {listReport.map((a) => (
          <SingleReport
            title={a.title}
            description={a.description}
            authorID={a.authorID}
            reportID={a._id}
          />
        ))}
      </div>
    );
    else return <h1 className='text-danger text-center mt-3 '>UnAuthorized</h1>
};


export default Reports;
