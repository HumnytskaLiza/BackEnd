const { Router } = require("express");
const { Theaters } = require("../models/theaters");

const router = new Router();

router.get("/theaters/:theaterId", async (req, res) => {
  const { theaterId } = req.params;
  const paramsDb = {};
  if (theaterId) {
    paramsDb["theaterId"] = theaterId;
  }
  const docs = await Theaters.find(paramsDb);
  return res.status(200).send(docs);
});

router.get("/theaters", async (req, res) => {
  const { address_city, address_zipcode, latitude, longtitude } = req.query;

  const queryDb = {};
  if (address_city) {
    queryDb["location.address.city"] = address_city;
  }
  if (address_zipcode) {
    queryDb["location.address.zipcode"] = address_zipcode;
  }
  if (latitude) {
    queryDb["location.geo.coordinates.0"] = latitude;
  }
  if (longtitude) {
    queryDb["location.geo.coordinates.1"] = longtitude;
  }

  const docs = await Theaters.find(queryDb);
  return res.status(200).send(docs);
});

module.exports = { theatersApiRouter: router };
