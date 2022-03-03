import Record from "../Model/Records.js";
import Image from "../Model/images.js";
import { addRecords, deleteRecords } from "./Records.js";
export const add =async (data,io,users)=>{
    const record = await addRecords(data)
    for (let i = 0; i < users.length; i++) {
      io.to(users[i]).emit("addRecord", {record});
    }
  }
  export const del =async (data,io,users)=>{
    const record = await deleteRecords(data)
    for (let i = 0; i < users.length; i++) {
      io.to(users[i]).emit("deleteRecord", record);
    }
  }

export const update = (data,io,users)=>{
    Record.findByIdAndUpdate(
      data.id,
      { name: data.name, date: new Date() },
      (err, docs) => {
        if (err) console.log(err);
        else {
          data.date = docs.date
          Image.findByIdAndUpdate(
            docs.id,
            { images: data.images },
            (err, docs) => {
              if (err) console.log(err);
              else {

                for (let i = 0; i < users.length; i++) {
                  io.to(users[i]).emit("recieve", {data});
                }
              }
            }
          );
        }
      }
    );
  }
  