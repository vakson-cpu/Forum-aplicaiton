import axios from 'axios'

export function PostThread(thread){
  return {
    type: "THREADS/POST",
    payload: thread,
  };
}


export function RemoveThread(PID){
  return {
    type: "THREADS/REMOVE",
    payload: PID,
  };
}


export const getThreads= async ()=>{
  try{
    const res = await axios.get(`http://localhost:5000.com/Threads/Get`);
    return( {
        type: "GET_THREADS",
        payload: res.data
    })
  }
  catch(e){
    console.log("ERROR OCCURED WHILE FETCHING");
  }
}

