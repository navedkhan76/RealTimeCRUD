import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { createRequire } from "module";
import records from "./Routes/Records.js";
import images from "./Routes/Images.js";
import dotenv from 'dotenv'
import { add, del, update } from "./Controller/socketFun.js";

const app = express();
dotenv.config()
const require = createRequire(import.meta.url);
const socket = require("socket.io");

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/records", records);
app.use("/images", images);
app.get('/',(req,res)=>{res.send('Hello to My APIs')})

//Available routes
const PORT = process.env.PORT || 5000;
try {
  mongoose
    .connect(process.env.CONNECTION_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mongoDB Connected"));
  mongoose.set("useFindAndModify", false);
} catch (error) {
  console.log(error.message);
}
const server = app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (socketId) => {

  users.push(socketId);
  console.log(users,"users")
};

const removeUser = (socketId) => {
  users = users.filter((item) => item !== socketId);
};

io.on("connection", (socket) => {
  socket.emit("connection");
  socket.on("addUser", () => {
    addUser(socket.id);
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
  socket.on("edit", (data) => update(data,io,users));
  socket.on("add",(data)=>add(data,io,users))
  socket.on("delete",(data)=>del(data,io,users))

});
