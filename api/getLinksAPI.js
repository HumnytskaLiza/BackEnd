const { Router } = require("express");
const { Links } = require("../models/links");

const router = new Router();

router.get("/links", async (req, res) => {
  const { expiredAt } = req.query;
  const parsedExpiredAt = JSON.parse(expiredAt);
  console.log(expiredAt);
  console.log(parsedExpiredAt);
  const queryDb = {};
  if (expiredAt) {
    queryDb.expiredAt = parsedExpiredAt;
  }
  try {
    const docs = await Links.find(queryDb);
    return res.status(200).send(docs);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = { getLinksApiRouter: router };
