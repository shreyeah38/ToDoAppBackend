import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";


export const app = express();
config({
    path: "./data/config.env",
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );


app.use("/users",userRouter);
app.use("/tasks",taskRouter);


app.get("/",(req,resp)=>{
    resp.send("Nice Works");
});

app.use(errorMiddleware);