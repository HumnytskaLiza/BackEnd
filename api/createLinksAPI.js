const { Router } = require("express");
const { Links } = require("../models/links");
const { Users } = require("../models/users");
const { generateApiKey } = require("generate-api-key");

const router = new Router();

router.post("/links", async (req, res) => {
  const elem = new Links({
    authorization: req.headers.apiKey,
    link: {
      original: req.body.original,
      cut: generateApiKey({
        method: "string",
        min: 10,
        max: 15,
        pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      }),
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

router.get("/links", async (req, res) => {
  const { original } = req.query;
  const queryDb = {};
  if (original) {
    queryDb["link.original"] = original;
  }
  const docs = await Links.find(queryDb);
  return res.status(200).send(docs);
});

router.use(async (req, res, next) => {
  const apiKey = req.header("x-api-key");
  let user = await Users.findOne({ apiKey: apiKey });
  if (!user) {
    res.status(401).send({ message: "This user is not authorized" });
  }
  next();
});
module.exports = { createLinksApiRouter: router };
