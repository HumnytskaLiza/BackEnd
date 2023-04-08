const express = require("express");
const bodyParser = require("body-parser");
const Mongo = require("./setup/mongoose");

require("dotenv").config();

const { salesApiRouter } = require("./api/sales");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const setup = async () => {
  await Mongo.setupDb(process.env.MONGO_DB_URI);

  app.use(salesApiRouter);

  app.listen(process.env.PORT, () => {
    console.log(`server started on port: ${process.env.PORT}`);
  });
};

setup();
