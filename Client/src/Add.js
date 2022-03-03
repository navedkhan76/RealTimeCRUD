import { Collapse, Grid, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import {useDispatch} from "react-redux"
import CancelOutlined from "@mui/icons-material/CancelOutlined";
const Add = ({ dis,addRecord }) => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const dispatch=useDispatch()
  const upload = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
            images.push(this.result)
          setImages([...images]);
        },
        false
      );
      reader.readAsDataURL(files[i]);
    }
  };
  return (
    <>
      <Collapse in={dis}>
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          style={{ display: "none" }}
          multiple
          onChange={(e) => upload(e)}
        />
        <div style={{ marginTop: "10px", display: "flex" }}>
          <TextField
            label="Name"
            multiline
            onChange={(e) => setName(e.target.value)}
          />
          <IconButton color="primary" alignItems="center">
            <label htmlFor="icon-button-file">
              <AddAPhotoIcon style={{ marginLeft: "10px" }} fontSize="large" />
            </label>
          </IconButton>
          <IconButton color="primary" alignItems="center" onClick={()=>{ 
            dispatch(addRecord({name:name,images:images}))
            setName("")
            setImages([])
        }}>
            <FileUploadRoundedIcon
              style={{ marginLeft: "10px" }}
              fontSize="large"
            />
          </IconButton>
        </div>
        <Grid container direction="row">
          
          {images.map((image,index) => (
            <Grid item xs={6}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={()=>setImages(images.filter((images,i)=>i!==index))}>
            < CancelOutlined/>
          </IconButton>
        </div>
              <img
                src={image}
                alt="Uploaded"
                style={{ position: "relative", width: "75%" }}
              ></img>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </>
  );
};
export default Add;
