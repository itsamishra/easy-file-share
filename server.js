const express = require("express");
const app = express();

const port = 4000;

app.get("/dummy-api/", (req, res) => {
  const dummyJson = [
    { id: 1, name: "Adam", age: 20 },
    { id: 2, name: "Alex", age: 30 },
    { id: 3, name: "Axel", age: 40 },
  ];

  res.json(dummyJson);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
