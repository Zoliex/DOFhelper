const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { exec } = require("child_process");

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

    var aperture = await command("gphoto2 --get-config f-number");
    var iso = await command("gphoto2 --get-config iso");
    var aperture = await command("gphoto2 --get-config shutterspeed");

    aperture.replace("Label: F-Number\nReadonly: 1\nType: RADIO", "");
    aperture.replace("\nEND", "");
    aperture.replace("Current: ", "");
    aperture.replace("Choice: ", "");
    aperture.split("\n");

    iso.replace("Label: ISO Speed\nReadonly: 0\nType: RADIO", "");
    iso.replace("\nEND", "");
    iso.replace("Current: ", "");
    iso.replace("Choice: ", "");
    iso.split("\n");

    shutterspeed.replace("Label: Shutter Speed\nReadonly: 0\nType: RADIO", "");
    shutterspeed.replace("\nEND", "");
    shutterspeed.replace("Current: ", "");
    shutterspeed.replace("Choice: ", "");
    shutterspeed.split("\n");

    settingsParsed.aperture.current = aperture[0].split(" ")[1];
    delete aperture[0];
    settingsParsed.iso.current = iso[0].split(" ")[1];
    delete iso[0];
    settingsParsed.shutterspeed.current = shutterspeed[0].split(" ")[1];
    delete shutterspeed[0];

    for (key of aperture) {
      var tempKey = key.split(" ");
      settingsParsed.aperture.choices.push(tempKey[1]);
    }

    for (key of iso) {
      var tempKey = key.split(" ");
      settingsParsed.iso.choices.push(tempKey[1]);
    }

    for (key of shutterspeed) {
      var tempKey = key.split(" ");
      settingsParsed.shutterspeed.choices.push(tempKey[1]);
    }
    socket.emit("res_settings", settingsParsed);
  });
});

server.listen(6500, () => {
  console.log("listening on localhost:6500");
});
