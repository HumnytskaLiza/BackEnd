const { Router } = require("express");
const { Users } = require("../models/users");

const router = new Router();

router.get("/users", async (req, res) => {
  const { name, email } = req.query;

  const queryDb = {};
  if (name) {
    queryDb.name = name;
  }
  if (email) {
    queryDb.email = email;
  }

  const docs = await Users.find(queryDb);
  return res.status(200).send(docs);
});

module.exports = { usersApiRouter: router };
