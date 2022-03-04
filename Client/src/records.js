import { Grid,  Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecords } from "./actions/Records";
import Record from "./Image";


const Records = ({update,setUpd,send,delRecord}) => {
  const { data } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      alignContent="center"
      style={{ padding: "13px" }}
    >
      <Grid item xs={3}>
        <Typography>Name</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>Date</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography>Images</Typography>
      </Grid>
        {
          data?.records.map((data)=><Record data={data} update={update} setUpd={setUpd} send={send} delRecord = {delRecord}/>)
        }
    </Grid>
  );
};

export default Records;
