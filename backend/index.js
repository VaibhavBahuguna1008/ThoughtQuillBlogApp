import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware } from "@clerk/express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
// Load environment variables
dotenv.config();

const app = express();

const __dirname = path.resolve();
app.use(express.urlencoded({ extended: true })); // For form-data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' , 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // if you're sending cookies or Authorization headers
  }));

app.options("*", cors());

app.use(clerkMiddleware());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/webHooks", webhookRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
    stack: error.stack,
  });
});


  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  })


app.listen(3000, async () => {
  try {
    await connectDB();
    console.log("Server is running on port 3000!");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
});
