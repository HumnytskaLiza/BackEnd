const express = require("express");
const bodyParser = require("body-parser");
const Mongo = require("./setup/mongoose");
const text = "some text";

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const setup = async () => {
  await Mongo.setupDb(process.env.MONGO_DB_URI);

  app.listen(process.env.PORT, () => {
    console.log(
      `server started on port: ${process.env.PORT} baseURL: ${process.env.BASE_URL}`
    );
  });
};

setup();
