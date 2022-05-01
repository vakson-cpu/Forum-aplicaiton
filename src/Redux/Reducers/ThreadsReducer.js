import axios from "axios";

// var today = new Date();

//Trebalo bi da umesto PostId bude Author ID
// var DUMMY_DATA = [
//   {
//     title: "Should be first",
//     replies: 36,
//     description:
//       "Prvi post Dobar mnogo",
//     date:
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
//     Tid: 1,
//     authorID:1,
//     postID:1
//   },
//   {
//     title: "TID==2",
//     replies: 32,
//     description:
//       "Moje iskreno misljenje je da je vaha tata za programiranje i stosta se mozee naucit od njega.",

//     date:
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
//     Tid: 2,
//     authorID:2,
//     postID:9

//   },
//   {
//     title: "TID===1 postID==8",
//     replies: 15,
//     description:
//       "Lorem ipsum konto fabio desu ka mandao isekaidterma lambandano",

//     date:
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
//     Tid: 1,
//     authorID:3,
//     postID:8

//   },
//   {
//     title: "TID===4 postID==7",
//     replies: 22,
//     description:
//       "Lorem ipsum konto fabio desu ka mandao isekaidterma lambandano",
//     date:
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
//     Tid: 4,
//     authorID:4,
//     postID:7

//   },
//   {
//     title: "TID===2 postID===6 ",
//     replies: 33,
//     description:
//       "Moje iskreno misljenje je da je vaha tata za programiranje i stosta se mozee naucit od njega.",

//     date:
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
//     Tid: 2,
//     authorID:5,
//     postID:6
//   },
//   {
//     title: "TID===3 PostID===2",
//     replies: 15,
//     description:
//       "Lorem ipsum konto fabio desu ka mandao isekaidterma lambandano",
//     date:
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
//     Tid: 3,
//     authorID:6,
//     postID:2
//   },
//   {
//     title: "TID===4 POSTID==5",
//     replies: 15,
//     description:
//       "Lorem ipsum konto fabio desu ka mandao isekaidterma lambandano",

//     date:
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
//     Tid: 4,
//     authorID:1,
//     postID:5
//   },
//   {
//     title: "Frontend boi",

//     replies: 15,
//     description: "Ko je baboooooo za front end,ja msm vaha iskr",

//     date:
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
//     Tid: 5,
//     authorID:4,
//     postID:4

//   },
//   {
//     title: "TERMIN 2k22",

//     replies: 15,
//     description: "Kada cemo da organizujemo termin,pitanje je sad",
//     date:
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
//     Tid: 7,
//     authorID:2,
//     postID:3

//   },
// ];
var DUMMY_DATA = [];
async function GetAllPosts() {
  try {
    await axios.get('https://localhost:5000.com/Threads/Get').then((res) => {
      console.log("DOBRO JE")
      let pom=res.data;
      console.log({pom});
    });
  } catch (err) {
    console.log("AWFUL");
  }
}

const TReducer = (state = DUMMY_DATA, action) => {
  switch (action.type) {
    case "THREADS/POST":
      console.log(action.type);
      console.log(`data je: ${action.payload}`);
      state.push(action.payload);
      return state;
    case "THREADS/REMOVE":
      state.filter((a) => a.postID === action.payload);
      return state;
    default:
      GetAllPosts();
      console.log("Default");
      return state;
  }
};

export default TReducer;
