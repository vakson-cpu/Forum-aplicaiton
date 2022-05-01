import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "Users/GetUsers",
  async (dispatch, getState) => {
    return await axios.get("http://localhost:5000/Users").then((res) => {
    return res.data.users;
    });
  }
);
export const UserSlices = createSlice({
  name: "Users",
  initialState: {
    Users: [],
    isLoggedIn:false,
    status: null,
  },
  reducers: {
    getInitialUsers: (state) => {
      return state.Users;
    },
    RemoveUsers: (state, action) => {
      state.Users.filter((a) => a.postID === action.payload);
      return state.Users;
    },
    CreateUsers: (state, action) => {
      state.Posts.push(action.payload);
    },
    LogInuj:(state,action)=>{
      state.isLoggedIn=true;
    },
    LogOut:(state,action)=>{
      state.isLoggedIn=false;
    }
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.Users = action.payload;
      console.log("Uspesno je primljen");
    },
    [getUsers.rejected]: (state, action) => {
      state.status = "failed";
      console.log("Fejl je primljen");
      console.log(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { getInitialUsers, RemoveUsers, CreateUsers,LogInuj,LogOut } = UserSlices.actions;

export default UserSlices.reducer;