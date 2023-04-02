const { Router } = require("express");
const { Users } = require("../models/users");
const { generateApiKey } = require("generate-api-key");
const Middleware = require("../middleware");

const router = new Router();

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  let check = await Users.findOne({ email: email, password: password });
  if (check) {
    return res.status(200).send(check);
  }
  if (!check) {
    return res
      .status(400)
      .send({ message: "User with such credentials was not found" });
  }
});

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

module.exports = { usersApiRouter: router };
