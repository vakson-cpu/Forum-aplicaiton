import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { changeProfilePic } from "../shared/Axy/axiosFunctions";
import "./ImageUpload.css";
const ImageUpload = ({image,setImage}) => {
  const [pickedFile, setpickedFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [url, setUrl] = useState("");

  const filePickerRef = useRef();
  const addImage = () => {
    setUrl("")
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setpickedFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const submitajFunkcijugorbovsku = async () => {
    let id = localStorage.getItem("id");
    let rezultat = await changeProfilePic(id, pickedFile);
    console.log(rezultat);
    setImage(rezultat)
    setUrl("");
  };
  useEffect(() => {
    if (!pickedFile) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setUrl(fileReader.result);
    };
    fileReader.readAsDataURL(pickedFile);
  }, [pickedFile]);

  return (
    <div className=" d-flex flex-column ">
      <input
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        ref={filePickerRef}
        onChange={pickedHandler}
      ></input>
      <Button variant="outline-danger" className='w-25 m-1' type="button" onClick={() => addImage()}>
        Change Avatar
      </Button>

      {url && <img  className="Image--Box text-black m-2" src={url} alt="Pick an img.." />}
      {!url && <p>Preview..</p>}
      { url &&
      <Button className='w-25 mt-2' variant='outline-success' onClick={()=>submitajFunkcijugorbovsku()} >Submit</Button>}
    </div>
  );
};

export default ImageUpload;
