import express, { response } from "express";
import dotenv from "dotenv";
import cors from "cors";

let app = express();
dotenv.config();
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("/Users/mukulpretham/Documents/GitHub/Timestamp-Api/views/index.html");
})

app.get("/api/:date", (req, res) => {
  let date = req.params.date;
  let UNIX;
  let UTC;
  if(!isNaN(Number(date))){
    date = Number(date);
    UNIX = date;
    UTC = new Date(date).toUTCString();
  }else {
    let parsedDate = new Date(date);
    if (parsedDate.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }
    UNIX = parsedDate.getTime();
    UTC = parsedDate.toUTCString();
  }
  res.json({
    unix: UNIX,
    utc: UTC 
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log("server has started");
})

