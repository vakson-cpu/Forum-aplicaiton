//Lista korisnika.
const DUMMY_USERS = [
  {
    userId: 1,
    name: "VAHID",
    age: 20,
    date: "12 04 2022",
    link: "https://lwlies.com/wp-content/uploads/2017/04/avatar-2009-1108x0-c-default.jpg",
  },
  {
    userId: 2,
    name: "Brox",
    age: 21,
    date: "21 04 2022",
    link: "https://thumbs.dreamstime.com/z/side-view-lion-walking-looking-camera-panthera-leo-side-view-lion-walking-looking-camera-panthera-leo-103837962.jpg",
  },
  {
    userId: 3,
    name: "Meris",
    age: 22,
    date: "12 04 2022",
    link: "https://i.imgur.com/9MhR729.jpg",
  },
  {
    userId: 3,
    name: "Albert",
    age: 22,
    date: "12 04 2022",
    link: "https://www.iconspng.com/images/young-user-icon.jpg",
  },
  {
    userId: 4,
    name: "Robert",
    age: 22,
    date: "12 04 2022",
    link: "https://i.imgur.com/9MhR729.jpg",
  },
  {
    userId: 5,
    name: "mEky",
    age: 22,
    date: "12 2 1995",
    link: "https://e-cdn-images.dzcdn.net/images/artist/77220ccb5a36d0e5df2c9e47f2c89de4/264x264-000000-80-0-0.jpg",
  },
  {
    userId: 6,
    name: "Kadir",
    age: 21,
    date: "12 04 2021",
    link: "https://i.kym-cdn.com/entries/icons/original/000/037/581/coverhasbully.jpg",
  },
];
const UserReducer = (state = DUMMY_USERS, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default UserReducer;
