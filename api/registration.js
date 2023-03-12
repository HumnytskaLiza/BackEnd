const { Router } = require("express");
const { Users } = require("../models/users");

const router = new Router();

router.post("/users", async (req, res) => {
  const { email, password, apiKey } = req.body;

  const elem = await Users.find({ email });
  if (elem) {
    return res.status(400).send({ message: "This email is already in use" });
  }

  if (!email) {
    return res.status(400).send({ message: `Field <email> is required` });
  }

  const user = { email, password };
  Users.push(user);
  res.status(201).send(user);
});

module.exports = { registrationRouter: router };
