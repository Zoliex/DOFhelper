const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var gphoto2 = require("gphoto2");
var GPhoto = new gphoto2.GPhoto2();

app.use("/", express.static("www"));

async function command(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    //console.log(`stdout: ${stdout}`);
    return stdout;
  });
}

io.on("connection", (socket) => {
  console.log("a user connected !");
  socket.on("settings", async () => {
    var settingsParsed = [];

    socket.emit("res_settings", settingsParsed);
  });
});

server.listen(6500, () => {
  console.log("listening on localhost:6500");
});
