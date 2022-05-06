import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import userRouter from "./routes/user.js"

dotenv.config()

const app = express()

app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());


app.use("/users", userRouter)

const MONGODB_URL = process.env.MONGODB

const port = 5000;

mongoose.connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}!`)
    })
  })
  .catch((err) => console.log(`${err} did not connect!`))

