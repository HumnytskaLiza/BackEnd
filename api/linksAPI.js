const { Router } = require("express");
const { Links } = require("../models/links");
const { generateApiKey } = require("generate-api-key");
const Middleware = require("../middleware");

const router = new Router();

router.get("/links", async (req, res) => {
  const { expiredAt } = req.query;
  const parsedExpiredAt = JSON.parse(expiredAt);
  console.log(expiredAt);
  console.log(parsedExpiredAt);
  const queryDb = {};
  if (parsedExpiredAt.gt) {
    queryDb.expiredAt = { $gt: new Date(parsedExpiredAt.gt) };
  }
  if (parsedExpiredAt.lt) {
    queryDb.expiredAt = { $lt: new Date(parsedExpiredAt.lt) };
  }
  if (parsedExpiredAt.gt && parsedExpiredAt.lt) {
    queryDb.expiredAt = {
      $gt: new Date(parsedExpiredAt.gt),
      $lt: new Date(parsedExpiredAt.lt),
    };
  }
  try {
    const docs = await Links.find(queryDb);
    return res.status(200).send(docs);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.post("/links", Middleware.authorization, async (req, res) => {
  const { original } = req.body;
  // Check if cut link already exists
  let cutLink = generateApiKey({
    method: "string",
    min: 10,
    max: 15,
    pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  });
  let check = await Links.findOne({ cut: cutLink });
  if (check) {
    cutLink = generateApiKey({
      method: "string",
      min: 10,
      max: 15,
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    });
  }
  // Create object
  const elem = new Links({
    link: {
      original: original,
      cut: cutLink,
    },
    expiredAt: Date.now() + 432000000,
  });

  try {
    const newLink = await elem.save();
    res.status(201).send(newLink);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = { linksApiRouter: router };
