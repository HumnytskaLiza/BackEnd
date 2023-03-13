const { Router } = require("express");
const { Users } = require("../models/users");

const router = new Router();

router.get("/users/:login", async (req, res) => {
  const { login } = req.params;
  const paramsDb = {};
  if (login) {
    paramsDb["email"] = login;
  }
  const elem = await Users.find(paramsDb);
  if (elem == "") {
    return res
      .status(400)
      .send({ message: "User with such credentials was not found" });
  }
  return res.status(200).send(elem);
});

module.exports = { getLoginApiRouter: router };
