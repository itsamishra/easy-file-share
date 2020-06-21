const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const server = app.listen(port, () => {
  console.log("Listening on port: " + port);
});
const io = require("socket.io")(server);

const appInfo = {
  base64SizeLimitInBytes: 10000000,
  maxNumberOfFilesInClient: 5,
};

// Allows us to serve static react file from build/ directory
app.use(express.static(path.join(__dirname, "build")));

// Serves react app
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/" + "index.html");
});

// Websocket logic
io.on("connection", (client) => {
  client.on("askServerForAppInfo", () => {
    client.emit("sendAppInfoToClient", appInfo);
  });

  client.on("sendFileToServer", (file) => {
    if (file.base64SizeInBytes <= appInfo.base64SizeLimitInBytes) {
      client.broadcast.emit("sendFileToClient", file);
    } else {
      console.log("File is too large!");
    }
  });
});
