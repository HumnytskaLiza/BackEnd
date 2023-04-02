const express = require("express");
const bodyParser = require("body-parser");
const Mongo = require("./setup/mongoose");

require("dotenv").config();

const { usersApiRouter } = require("./api/usersAPI");
const { linksApiRouter } = require("./api/linksAPI");
const { shortLinkApiRouter } = require("./api/shortLinkAPI");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const setup = async () => {
  await Mongo.setupDb(process.env.MONGO_DB_URI);

  app.use(usersApiRouter);
  app.use(linksApiRouter);
  app.use(shortLinkApiRouter);

  app.listen(process.env.PORT, () => {
    console.log(
      `server started on port: ${process.env.PORT} baseURL: ${process.env.BASE_URL}`
    );
  });
};

setup();
