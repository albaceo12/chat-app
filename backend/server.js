import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "../backend/routes/auth.routes.js";
import messageRoutes from "../backend/routes/message.routes.js";
import userRoutes from "../backend/routes/user.routes.js";
import connectTomongodb from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
// const app = express();// we are setting socketio thats why we commenting this line
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
// console.log(__dirname);
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
server.listen(PORT, async () => {
  console.log(`server running on port ${PORT}!!!`);
  await connectTomongodb();
});
