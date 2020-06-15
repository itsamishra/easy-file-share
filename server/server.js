const io = require("socket.io")();

const appInfo = {
  base64SizeLimitInBytes: 10000000,
  maxNumberOfFilesInClient: 5,
};

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

const port = 3001;
io.listen(port);
console.log("listening on port ", port);
