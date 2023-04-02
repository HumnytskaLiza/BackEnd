const { Router } = require("express");
const { Links } = require("../models/links");

const router = new Router();

router.get("/shortLink/:cut", (req, res) => {
  const { cut } = req.params;
  const paramsDb = {};
  if (cut) {
    paramsDb["link.cut"] = cut;
  }
  Links.findOne({ paramsDb }, function (err, links) {
    if (err) {
      return res.status(400).send({ message: "Error" });
    }
    if (!Links) {
      return res.status(400).send({ message: "Short link was not found" });
    }
    if (Links.expiredAt > Date.now()) {
      return res.status(400).send({ message: "Link was expired" });
    }
    res.redirect(links.link.original);
  });
});

module.exports = { shortLinkApiRouter: router };
