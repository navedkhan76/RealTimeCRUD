import { Collapse, Grid, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { addRecords } from "./actions/Records";
import { useDispatch } from "react-redux";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
const Edit = ({ dis, names, image,id,send ,setEdit}) => {
  const [name, setName] = useState(names);
  const [images, setImages] = useState(image);
  useEffect(() => {
    setName(names);
    setImages(image);
  }, [image, names]);
  const upload = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          images.push(this.result);
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
          id={id}
          type="file"
          style={{ display: "none" }}
          multiple
          onChange={(e) => upload(e)}
        />
        <div style={{ marginTop: "10px", display: "flex" }}>
          <TextField
            multiline
            value={name}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <IconButton color="primary" alignItems="center">
            <label htmlFor={id}>
              <AddAPhotoIcon style={{ marginLeft: "10px" }} fontSize="large" />
            </label>
          </IconButton>
          <IconButton
            color="primary"
            alignItems="center"
            onClick={() => {
             send({ name: name, images: images,id: id });
             setEdit(false)
            }}
          >
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
            < CancelOutlinedIcon/>
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
export default Edit;
