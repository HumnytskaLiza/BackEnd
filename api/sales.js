const { Router } = require("express");
const { Sales } = require("../models/sales");

const router = new Router();

router.get("/sales", async (req, res) => {
    const { storeLocation } = req.query;
    
});

module.exports = { salesApiRouter: router };