const { Router } = require("express");
const { Users } = require("../models/users");
const { generateApiKey } = require("generate-api-key");
const Middleware = require("../middleware");

const router = new Router();

router.post("/users", Middleware.registration, async (req, res) => {
  const elem = new Users({
    email: req.body.email,
    password: req.body.password,
    apiKey: generateApiKey({
      method: "string",
      min: 25,
      max: 35,
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    }),
  });
  try {
    const newUser = await elem.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/users", async (req, res) => {
  const { email } = req.query;
  const queryDb = {};
  if (email) {
    queryDb.email = email;
  }
  const docs = await Users.find(queryDb);
  return res.status(200).send(Users);
});

module.exports = { registrationApiRouter: router };
