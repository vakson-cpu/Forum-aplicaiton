import React, { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { LogInuj } from "../../Redux/Reducers/UserSlices";
import ReactDom from "react-dom";
import "./UserModel.css";
import axios from "axios";

const FormState = {
  Name: "",
  Email: "",
  Password1: "",
  Password2: "",
};

const UserModal = ({ regularClose,Close, open,korisnici }) => {
  //Reducer logic
  const ReduxDispatch=useDispatch();
  
  const InpuReducer = (inputState, action) => {
    switch (action.type) {
      case "CHANGE":
        return { ...inputState, [action.field]: action.payload };
      default:
        return inputState;
    }
  };
  //States
  const [inputState, dispatch] = useReducer(InpuReducer, FormState);
  const [Chose, setChose] = useState(false);
  if (open === false) {
    return null;
  }

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      field: event.target.name,
      payload: event.target.value,
    });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
      try{
      await axios.post("http://localhost:5000/Users/Create", {
        Name: `${inputState.Name}`,
        email: `${inputState.Email}`,
        age: 20,
        date: `${new Date().toLocaleString() + ""}`,
        password: `${inputState.Password1}`,headers: {
          'Content-Type': 'application/json',
          },
      }).then((res)=>{
        console.log("Proso je")
        regularClose();
      }).catch((err)=>console.log("Failed"))
    }
    catch(err){
      console.log("AH")
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
      try{
      await axios.post("http://localhost:5000/Users/LogIn", {
        email: `${inputState.Email}`,
        password: `${inputState.Password}`,headers: {
          'Content-Type': 'application/json',
          },
      }).then((res)=>{console.log("Proso je")
      console.log(res.data)
      let id= res.data.userId
      localStorage.setItem('id',id)
      ReduxDispatch(LogInuj());
      regularClose();
    }  
      ).catch((err)=>console.log("Failed"))
    }
    catch(err){
      console.log("AH")
    }
    
  };
  function ChangeIT() {
    setChose(!Chose);
  }
  if (Chose === false) {
    return ReactDom.createPortal(
      <div className="Modal--Frame">
        <div className="Modal--Info">
          <h3>Registration</h3>
          <button onClick={regularClose} className="CloseIcon">
            <i className="fa-solid fa-x"></i>
          </button>
          <form className="Registration--Form" onSubmit={SubmitHandler}>
            <p>Name</p>
            <input
              onChange={(e) => changeHandler(e)}
              name="Name"
              value={inputState.Name}
              type="text"
            />
            <p>Email</p>
            <input
              onChange={(e) => changeHandler(e)}
              name="Email"
              value={inputState.Email}
              type="text"
            />
            <p>Password</p>
            <input
              onChange={(e) => changeHandler(e)}
              name="Password1"
              value={inputState.Password1}
              type="password"
            />
            <p>Password</p>
            <input
              type="password"
              name="Password2"
              onChange={(e) => changeHandler(e)}
              value={inputState.Password2}
            />
            <br></br>
            <input
              className="Submit--Button"
              type="submit"
              value={"Register"}
            />
          </form>
          <button className="Change--IT" onClick={ChangeIT}>
            Already Have an Account?
          </button>
        </div>
      </div>,
      document.getElementById("Auth")
    );
  }
  if (Chose === true) {
    return ReactDom.createPortal(
      <div className="Modal--Frame">
        <div className="Modal--Info">
          <h3>Registration</h3>
          <button onClick={regularClose} className="CloseIcon">
            <i className="fa-solid fa-x"></i>
          </button>
          <form onSubmit={(e)=>loginHandler(e)} className="Registration--Form">
            <p>Email</p>
            <input
              type="text"
              name="Email"
              onChange={(e) => changeHandler(e)}
              value={inputState.Email}
            />
            <p>Password</p>
            <input
              type="password"
              name="Password"
              onChange={(e) => changeHandler(e)}
              value={inputState.Password}
            />
            <br></br>
            <input className="Submit--Button" type="submit" value={"Log In"} />
          </form>
          <button className="Change--IT" onClick={ChangeIT}>
            Dont have an Account?
          </button>
        </div>
      </div>,
      document.getElementById("Auth")
    );
  }
};

export default UserModal;
