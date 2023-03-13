const { Router } = require("express");
const { Links } = require("../models/links");

const router = new Router();

router.get("/shortLinks/:cut", async (req, res) => {
  const { cut } = req.params;
  const paramsDb = {};
  if (cut) {
    paramsDb["cut"] = cut;
  }

  const docs = await Links.find(paramsDb);
  res.status(201).send(docs);

  return res.status(400).send({ message: "error" });
});

module.exports = { getShortLinkApiRouter: router };
