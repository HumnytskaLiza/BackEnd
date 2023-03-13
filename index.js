const express = require("express");
const bodyParser = require("body-parser");
const Mongo = require("./setup/mongoose");
const Middleware = require("./middleware");

require("dotenv").config();

const { registrationApiRouter } = require("./api/registrationAPI");
const { getLoginApiRouter } = require("./api/getLoginAPI");
const { createLinksApiRouter } = require("./api/createLinksAPI");
const { getLinksApiRouter } = require("./api/getLinksAPI");
const { getShortLinksApiRouter } = require("./api/getShortLinkAPI");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const setup = async () => {
  await Mongo.setupDb(process.env.MONGO_DB_URI);

  app.use(Middleware.authorization);

  app.use(registrationApiRouter);
  app.use(getLoginApiRouter);
  app.use(createLinksApiRouter);
  app.use(getLinksApiRouter);
  //app.use(getShortLinksApiRouter);

  app.listen(process.env.PORT, () => {
    console.log(
      `server started on port: ${process.env.PORT} baseURL: ${process.env.BASE_URL}`
    );
  });
};

setup();
