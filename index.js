const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var gphoto2 = require("gphoto2");
var GPhoto = new gphoto2.GPhoto2();

var camera;

app.use("/", express.static("www"));

GPhoto.list(function (list) {
  if (list.length === 0) return;
  camera = list[0];
  console.log("Found", camera.model);
});

GPhoto.setLogLevel(1);
GPhoto.on("log", function (level, domain, message) {
  console.log(domain, message);
});

io.on("connection", (socket) => {
  console.log("a user connected !");
  socket.on("settings", async () => {
    await camera.getConfig(function (er, settings) {
      socket.emit("res_settings", settings);
    });
  });
});

server.listen(6500, () => {
  console.log("listening on localhost:6500");
});
