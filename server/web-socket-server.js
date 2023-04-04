const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const events = require("events");
const path = require("path");
const setTelegramWebhook = require("./telegram_bot");
const setupWebSocket = require("./websocket");
const Mongo = require("../setup/mongoose");

const app = express();
setupWebSocket();
const emitter = new events.EventEmitter();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
setTelegramWebhook(app, emitter);

app.use(express.static(path.join(__dirname, "../public/dist")));

app.get("/login", (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send({
      message: "parameter id is required",
    });
  }
  const eventName = `login-${id}`;
  console.log(`Wait on login id:${id}`);
  emitter.once(eventName, (userInfo) => {
    res.status(200).send(userInfo);
  });
});

const setup = async () => {
  await Mongo.setupDb(process.env.MONGO_DB_URI);

  app.listen(process.env.PORT, () => {
    console.log(
      `server started on port: ${process.env.PORT} baseURL: ${process.env.BASE_URL}`
    );
  });
};

setup();
