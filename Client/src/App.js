import { AppBar, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Add from "./Add";
import Records from "./records";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
let socket;
function App() {
  const [add, setAdd] = useState(false);
  const [update, setUpd] = useState({ upd: false });
  const PORT = "localhost:5000";
  const { data } = useSelector((state) => state);
  useEffect(() => {
    socket = io("realtimecrud.herokuapp.com/");
    socket.emit("addUser");
    console.log("Connected");
  }, [PORT]);
  const send = (record) => {
    socket.emit("edit", record);
  };
  const addRecord = (record) => {
    socket.emit("add", record);
  };
  const delRecord = (record) => {
    console.log(record)
    socket.emit("delete", record);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket)
      socket.on("recieve", (data) => {
        setUpd({ upd: true, record: { data } });
      });
  }, [socket]);
  useEffect(() => {
    if (socket)
      socket.on("addRecord", (datum) => {
        console.log(datum, "added");
        if (data.loading) {
          dispatch({ type: "LOADING" });
          dispatch({ type: "ADD_RECORD", payload: datum.record.newrecord });
        }
      });
  }, [socket]);
  useEffect(() => {
    if (socket)
      socket.on("deleteRecord", (datum) => {
        console.log(datum, "deleted");
        dispatch({type:"DELETE",payload:datum})
       
      });
  }, [socket]);

  return (
    <>
      <div>
        <AppBar style={{ position: "relative", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            CRUD real-time system
          </Typography>
        </AppBar>
        <Records send={send} update={update} setUpd={setUpd} delRecord = {delRecord} />
      </div>
      <IconButton onClick={() => setAdd(!add)}>
        <AddCircleOutlinedIcon
          style={{ marginTop: "10px" }}
          color="primary"
          fontSize="large"
        />
      </IconButton>
      <Add dis={add} addRecord={addRecord} />
    </>
  );
}

export default App;
