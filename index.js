const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
