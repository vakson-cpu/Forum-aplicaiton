import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Svaka th
export const getPosts = createAsyncThunk(
  "Threads/GetPosts",
  async (dispatch, getState) => {
    return await axios.get("http://localhost:5000/Threads/Get").then((res) => {
      return res.data.posts;
    });
  }
);
export const getPostByTid = createAsyncThunk(
  "Threads/GetPostsByTid",
  async (Tid) => {
    return await axios
      .get(`http://localhost:5000/Threads/GetBy/${Tid}`)
      .then((res) => {
        return res.data.Posts;
      })
      .catch((err) => {
        console.log("TID :", Tid);
        console.log("GRESKA" + err);
      });
  }
);

export const postThreads = createAsyncThunk(
  "Threads/PostThreads",
  async (
    dispatch,
    getState,
    title,
    replies,
    description,
    time,
    Tid,
    authorID
  ) => {
    return await axios
      .post(`http://localhost:5000/Threads/:${authorID}`, {
        title: title,
        replies: replies,
        description: description,
        time: time,
        Tid: Tid,
      })
      .then("Uspesno Slanje");
  }
);
export const threadsSlice = createSlice({
  name: "threads",
  initialState: {
    Posts: [],
    PostsByTid: [],
    status: null,
    status4Tid:null,
  },
  reducers: {
    getInitial: (state) => {
      return state.Posts;
    },
    RemoveThreads: (state, action) => {
      state.Posts.filter((a) => a.postID === action.payload);
      return state.Posts;
    },
    PostThreads: (state, action) => {
      state.Posts.push(action.payload);
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.status = "loading";
    },

    [getPosts.rejected]: (state, action) => {
      state.status = "failed";
      console.log("Fejl je primljen");
      console.log(action.payload);
    },
    [getPosts.fulfilled]: (state, action) => {
      state.status = "success";
      state.Posts = action.payload;
      console.log("GET POSTS");
      console.log("STATE.POSTS:",state.Posts);
    },
    [postThreads.pending]: (state, action) => {
      state.status = "loading";
    },
    [postThreads.fulfilled]: (state, action) => {
      state.status = "success";
      console.log("Uspesno je primljen");
    },
    [postThreads.rejected]: (state, action) => {
      state.status = "failed";
      console.log("Fejl je primljen");
      console.log(action.payload);
    },
    [getPostByTid.pending]: (state, action) => {
      state.status4Tid = "loading";
    },
    [getPostByTid.rejected]: (state, action) => {
      state.status4Tid = "failed";
    },
    [getPostByTid.fulfilled]: (state, action) => {
      state.PostsByTid = action.payload;
      state.status4Tid = "Success";
    },
  },
});

// Action creators are generated for each case reducer function
export const { getInitial, RemoveThreads, PostThreads } = threadsSlice.actions;

export default threadsSlice.reducer;
