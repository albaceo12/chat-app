import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    orgin: ["http://localhost:3000"],
    methods: ["get", "post"],
  },
});
export const getreciversockerId = (recieverId) => {
  return userSocketMap[recieverId];
};
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  // console.log("userid:", socket.handshake.query.userId);
  if (userId !== undefined) userSocketMap[userId] = socket.id;

  io.emit("getOnlineusers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineusers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
