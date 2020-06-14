const io = require("socket.io")();

io.on("connection", (client) => {
  client.on("subscribeToTimer", (interval) => {
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });

  client.on("sendFileToServer", (file) => {
    client.broadcast.emit("sendFileToClient", file);
  });
});

const port = 4000;
io.listen(port);
console.log("listening on port ", port);
