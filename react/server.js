
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import "express-async-errors";
// Router
import postrouter from "./routers/postrouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from './routers/userRouter.js';

//Cookie Parser
import cookieParser from 'cookie-parser';

//middelware
import errorHandlerMiddleware from "./middelware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middelware/authMiddleware.js";


const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use("/api/v1/posts", authenticateUser,postrouter);




// Error Handling
// 404 Not Found
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

// 500 Internal Server Error
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// MongoDB Connection and Server Startup
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error); // It's better to use console.error for logging errors
    process.exit(1);
  }
};

startServer();
