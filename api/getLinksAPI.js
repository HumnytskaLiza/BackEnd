const { Router } = require("express");
const { Links } = require("../models/links");

const router = new Router();

router.get("/links", async (req, res) => {
  const { dateBefore, dateAfter, period } = req.query;
  const queryDb = {};
  if (dateAfter) {
    queryDb.expiredAt = { $gt: dateAfter };
  }
  if (dateBefore) {
    queryDb.expiredAt = { $lt: dateBefore };
  }

  if (period) {
    if (dateAfter || dateBefore) {
      return res
        .status(400)
        .send({ message: "Request can contain only period" });
    }
    const [from, to] = period.split(",").map((e) => parseInt(e, 10));
    if (from > to) {
      return res.status(400).send({ message: "Wrong period" });
    }
    queryDb.expiredAt = { $gt: from, $lt: to };
  }
  try {
    const docs = await Links.find(queryDb);
    return res.status(200).send(docs);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = { getLinksApiRouter: router };
