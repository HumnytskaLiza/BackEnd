const express = require("express");
const bodyParser = require("body-parser");
const Mongo = require("./setup/mongoose");

require("dotenv").config();

const { usersApiRouter } = require("./api/usersAPI");
const { sessionsApiRouter } = require("./api/sessionsAPI");
const { theatersApiRouter } = require("./api/theatersAPI");

const app = express();
app.use(bodyParser.json());

const setup = async () => {
  await Mongo.setupDb(process.env.MONGO_DB_URI);

  // fisrt API route
  app.use(sessionsApiRouter);

  // second and third API routes
  app.use(theatersApiRouter);

  // fourth API route
  app.use(usersApiRouter);

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
};

setup();
