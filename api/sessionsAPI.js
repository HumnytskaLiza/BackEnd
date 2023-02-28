const { Router } = require("express");
const { Sessions } = require("../models/sessions");

const router = new Router();

router.get("/sessions", async (req, res) => {
  const { userId } = req.query;

  const queryDb = {};
  if (userId) {
    queryDb.userId = userId;
  }

  const docs = await Sessions.find(queryDb);
  return res.status(200).send(docs);
});

module.exports = { sessionsApiRouter: router };
