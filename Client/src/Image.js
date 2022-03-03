import { Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getImages } from "./api/api";
import { Typography } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Edit from "./Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
let data;
const Record = ({ name, date, id, item, update, setUpd, send, delRecord }) => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState("Loading...");
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch()
  useEffect(async () => {
    if (images.length == 0) {
      data = await getImages(id);
      setImages(data.data.images);
      setText("No Images");
    }
  }, [id]);
  // console.log(update,item)
  useEffect(() => {
    if (update.upd && update?.record?.data?.data?.id === item)
      {
        setImages(update.record.data.data.images);
        dispatch({type:"EDIT_RECORD",payload:update.record.data.data})
        setUpd({update:false})
      }
      
  }, [update, item,dispatch]);
  // console.log(id,images)
  return (
    <>
      <Grid item xs={3} style={{ border: "1px solid black" }}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid item xs={2} style={{ border: "1px solid black" }}>
        <Typography>{date}</Typography>
      </Grid>
      <Grid item xs={7} style={{ border: "1px solid black" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setEdit(!edit)}>
            <EditTwoToneIcon />
          </IconButton>
          <IconButton onClick={()=>delRecord({record:item,image:id})}>
            <DeleteIcon />
          </IconButton>
        </div>
        <Grid contianer direction="column" spacing={2}>
          {images.length ? (
            images?.map((item) => (
              <Grid item xs={12}>
                <img
                  src={item}
                  alt="Loading.."
                  position="relative"
                  style={{ width: "90%" }}
                ></img>
              </Grid>
            ))
          ) : (
            <Typography>{text}</Typography>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {edit && (
          <Edit dis={edit} image={images} names={name} id={item} send={send} setEdit={setEdit} />
        )}
      </Grid>
    </>
  );
};

export default Record;
