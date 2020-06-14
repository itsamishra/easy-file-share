const io = require("socket.io")();

const base64SizeLimitInBytes = 10000000; // 10 MB size limit

fileIsSmallerThanBase64SizeLimitInBytes = (file) => {
  return file.base64SizeInBytes <= base64SizeLimitInBytes;
};

io.on("connection", (client) => {
  client.on("askServerForBase64SizeLimitInBytes", () => {
    client.emit("sendBase64SizeLimitToClient", base64SizeLimitInBytes);
  });

  client.on("sendFileToServer", (file) => {
    if (file.base64SizeInBytes <= base64SizeLimitInBytes) {
      client.broadcast.emit("sendFileToClient", file);
    } else {
      console.log("File is too large!");
    }
  });
});

const port = 4000;
io.listen(port);
console.log("listening on port ", port);
