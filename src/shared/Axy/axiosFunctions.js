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

export async function makeMod(userID) {
  let rez = await axios
    .put(`http://localhost:5000/Users/Moderate/${userID}`)
    .then((req) => req.data)
    .catch((err) => console.log(err));
  console.log(rez);
}
//---------------------------------- COMMENT AREA
export const writeComment = async (authorID, description, postID) => {
  let comment = await axios
    .post(`http://localhost:5000/Comments/MakeComment/${postID}`, {
      authorID,
      description,
    })
    .then((res) => res.data.comment)
    .catch((err) => console.log("ERROR: ", err));
  return comment;
};

export const getCommentsByPost = async (id, page) => {
  console.log(`Dobijena stranica je:${page}`);
  if (+page < 0) page = 0;
  let kor = await axios
    .get(`http://localhost:5000/Comments/getComments/${id}?page=${page}`)
    .then((res) => {
      console.log("Komenatri su: ", res.data.Comment);
      return { Comment: res.data.Comment, Quantity: res.data.Quantity };
    })
    .catch((err) => console.log(err));
  return kor;
};

export const deleteComments = async (postID, authorID, CommentID) => {
  console.log("author ID JE : ", authorID);
  let deletedComment = await axios
    .delete(`http://localhost:5000/Comments/deleteComment/${postID}`, {
      data: {
        CommentID,
        authorID,
      },
    })
    .then((res) => {
      return res.data.Komentar;
    })
    .catch((error) => console.log(error));

  return deletedComment;
};
export const editComment = async (commentID, Desc) => {
  let rezultat = await axios
    .put(`http://localhost:5000/Comments/Edit/${commentID}`, { newDesc: Desc })
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return rezultat;
};
//--- PORUKE
export async function getRecievedMessages(userID) {
  let rezultat = await axios
    .get(`http://localhost:5000/Messages/Recieved/${userID}`)
    .then((a) => a.data.Messages)
    .catch((err) => console.log(err));
  return rezultat;
}
export async function getSentMessages(userID) {
  let rezultat = await axios
    .get(`http://localhost:5000/Messages/Sent/${userID}`)
    .then((a) => a.data.Messages)
    .catch((err) => console.log(err));
  console.log("Rez", rezultat);
  return rezultat;
}

export async function getSentMessagesFromTrash(userID) {
  let rezultat = await axios
    .get(`http://localhost:5000/Messages/Trash/${userID}`)
    .then((res) => res.data.Messages)
    .catch((err) => {
      console.log(err);
    });
  console.log("ZA SMECE JE StiGLO: ", rezultat);
  return rezultat;
}

export async function sendMailToTrash(MessageID, userID, tip) {
  let rezultat = await axios
    .put(`http://localhost:5000/Messages/Trash/${MessageID}`, {
      data: {
        tip: tip,
        userID: userID,
      },
    })
    .then((req) => req.data)
    .catch((errr) => console.log(errr));
  console.log("STAJ E STIGLO ", rezultat);
}

export async function deleteSentMailFromTrash(MessageID) {
  let rez = await axios
    .delete(`http://localhost:5000/Messages/Delete/Sent/${MessageID}`)
    .then((req) => req)
    .catch((err) => console.log(err));
  console.log(rez);
}

export async function deleteRecievedMailFromTrash(MessageID) {
  let rez = await axios
    .delete(`http://localhost:5000/Messages/Delete/Recieved/${MessageID}`)
    .then((req) => req)
    .catch((err) => console.log(err));
  console.log(rez);
}

export async function SMTP(userName, authorID, description, title) {
  let recieverName = userName;
  let rez = await axios
    .post(`http://localhost:5000/Messages/Send/${authorID}`, {
      recieverName,
      description,
      title,
    })
    .then((res) => res.data)
    .catch((err) => console.log("ERR", err));
  console.log(rez);
  return rez;
}

export async function GetMessageByID(MessageID) {
  let rez = await axios
    .get(`http://localhost:5000/Messages/Message/${MessageID}`)
    .then((res) => res.data.Message)
    .catch((err) => console.log(err));
  console.log("REZULTAT JE ", rez);
  return rez;
}

export async function ReadMessage(MessageID) {
  let rez = await axios
    .put(`http://localhost:5000/Messages/Message/Read/${MessageID}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
  return "Procitana porucica ";
}

//---Post

export async function MakePost(authorID, title, description, Tid, time) {
  let rez = await axios
    .post(`http://localhost:5000/Threads/Create/${authorID}`, {
      title,
      description,
      time,
      Tid,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  console.log("Uspesno Postavljeno: ", rez);
}

export async function viewPost(postID) {
  let rez = await axios
    .put(`http://localhost:5000/Threads/View/${postID}`)
    .then((req) => req.data)
    .catch((err) => console.log(err));
  console.log(rez);
}

export async function reportComment(
  title,
  commentID,
  description,
  authorID,
  pageNumber,
  threadID
) {
  let result = await axios
    .post(`http://localhost:5000/Report/reportComment/${commentID}`, {
      title: title,
      description: description,
      authorID: authorID,
      pageNumber: pageNumber,
      postID: threadID,
    })
    .then((req) => req.data)
    .catch((err) => console.log(err));
  console.log(result);
  return result;
}

export async function reportThread(
  title,
  postID,
  description,
  authorID,
  pageNumber
) {
  let result = await axios
    .post(`http://localhost:5000/Report/reportThread/${postID}`, {
      title: title,
      description: description,
      authorID: authorID,
      pageNumber: pageNumber,
    })
    .then((req) => req.data)
    .catch((err) => console.log(err));
  console.log(result);
  return result;
}

export async function getReports() {
  let result = await axios
    .get("http://localhost:5000/Report/getReports")
    .then((res) => res.data.reports)
    .catch((err) => err);
  console.log(result);
  return result;
}

export async function getReportById(reportID) {
  let result = await axios
    .get(`http://localhost:5000/Report/getReport/${reportID}`)
    .then((req) => req.data.report)
    .catch((err) => console.log(err));
  console.log("Dobijeni rezultat", result);
  return result;
}
export async function changeUserBio(userID, bio) {
  let result = await axios
    .put(`http://localhost:5000/Users/User/ChangeBio/${userID}`, { Bio: bio })
    .then((res) => res.data)
    .catch((err) => err);
  console.log(result);
}

export async function changeProfilePic(userID, image) {
  const formData = new FormData();
  formData.append("image", image);
  let result = await axios
    .put(`http://localhost:5000/Users/Profile/${userID}`, formData)
    .then((res) => res.data.url)
    .catch((err) => err);
  return result;
}
