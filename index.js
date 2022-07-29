const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use("/", express.static("www"));

io.on("connection", (socket) => {
  console.log("a user connected !");
  socket.on("settings", () => {
    console.log("SENDING SETTINGS");
  });
});

server.listen(6500, () => {
  console.log("listening on localhost:6500");
});
