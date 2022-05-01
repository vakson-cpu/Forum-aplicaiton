import axios from "axios";

export const getUserByID = async (id) => {
  let kor = await axios
    .get(`http://localhost:5000/Users/getUser/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => console.log(err));
  return kor;
};




//---------------------------------- COMMENT AREA
export const writeComment = async (authorID,description, postID) => {
  let comment = await axios
    .post(`http://localhost:5000/Comments/MakeComment/${postID}`,{authorID,description})
    .then((res) => res.data.comment)
    .catch((err) => console.log("ERROR: ", err));
    return comment;
};

export const getCommentsByPost = async (id,page) => {
  console.log(`Dobijena stranica je:${page}`)
  let kor = await axios
    .get(`http://localhost:5000/Comments/getComments/${id}?page=${page}`)
    .then((res) => {
      console.log('Komenatri su: ',res.data.Comment);
      return {Comment:res.data.Comment,Quantity:res.data.Quantity}
    })
    .catch((err) => console.log(err));
  return kor;
};




