const { Router, query } = require("express");
const { Sales } = require("../models/sales");

const router = new Router();

router.get("/sales", async (req, res) => {
  let queryDb = {};
  let filter;

  // Store Location
  const { storeLocation } = req.query;
  let char = /[ * ]/;
  if (storeLocation) {
    // storeLocation = text
    if (!storeLocation.match(char)) {
      filter = "(" + storeLocation + ")";
      queryDb.storeLocation = { $regex: filter };
    }
    if (storeLocation.match(char)) {
      // storeLocation = tex*
      if (storeLocation.slice(-1) == "*") {
        filter = "^(" + storeLocation.slice(0, -1) + ")";
        queryDb.storeLocation = { $regex: filter };
      }

      // storeLocation = *tex
      if (storeLocation.charAt(0) == "*") {
        filter = "(" + storeLocation.substring(1) + ")$";
        queryDb.storeLocation = { $regex: filter };
      }

      // storeLocation = te\*x
      if (storeLocation.charAt(0) != "*" && storeLocation.slice(-1) != "*") {
        const res = storeLocation.split("\\*");
        filter = "^[" + res[0] + "][a-z]+[" + res[1] + "]$";
        queryDb.storeLocation = { $regex: filter };
      }
    }
  }

  // Customer age
  const { customer_age } = req.query;
  if (customer_age) {
    const parsedAge = JSON.parse(customer_age);
    if (parsedAge.gt) {
      queryDb["customer.age"] = { $gt: parsedAge.gt };
    }
    if (parsedAge.lt) {
      queryDb["customer.age"] = { $lt: parsedAge.lt };
    }
    if (parsedAge.gt && parsedAge.lt) {
      if (parsedAge.gt > parsedAge.lt || parsedAge.gt == parsedAge.lt) {
        return res
          .status(400)
          .send({ message: "You have entered wrong values" });
      }
      queryDb["customer.age"] = {
        $gt: parsedAge.gt,
        $lt: parsedAge.lt,
      };
    }
  }

  // Customer Email Domain
  const { customer_emailDomain } = req.query;
  if (customer_emailDomain) {
    const regex_email = "(" + customer_emailDomain + ")$";
    queryDb["customer.email"] = { $regex: regex_email };
  }

  // Items Tags
  const { items_tags } = req.query;
  if (items_tags) {
    // Put all tags in array
    const arr = items_tags.split(",");
    filter = { $or: [] };
    for (let i = 0; i < arr.length; i++) {
      filter.$or.push({ "items.tags": `${arr[i]}` });
    }
    queryDb = filter;
  }

  // Coupon Used
  const { couponUsed } = req.query;
  if (couponUsed) {
    if (couponUsed == "true" || couponUsed == "false") {
      queryDb.couponUsed = couponUsed;
    } else {
      return res.status(400).send({ message: "You have entered wrong value" });
    }
  }

  try {
    const docs = await Sales.find(queryDb);
    return res.status(200).send(docs);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});
module.exports = { salesApiRouter: router };
