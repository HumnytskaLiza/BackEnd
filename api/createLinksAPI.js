const { Router } = require("express");
const { Links } = require("../models/links");
const { Users } = require("../models/users");
const { generateApiKey } = require("generate-api-key");
const Middleware = require("../middleware");

const router = new Router();
//router.use(Middleware.authorization);

router.post("/links", async (req, res) => {
  const apiKey = req.header("x-api-key");
  const elem = new Links({
    link: {
      original: apiKey,
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

module.exports = { createLinksApiRouter: router };
