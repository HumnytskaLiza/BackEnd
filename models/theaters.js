const { Schema, Types, model } = require("mongoose");

const schema = new Schema({
  _id: { type: Types.ObjectId },
  theaterId: { type: Number },
  location: {
    address: {
      street1: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
    geo: {
      type: { type: String },
      coordinates: { type: [Number] },
    },
  },
});

const Theaters = new model("theaters", schema, "theaters");

module.exports = { Theaters };
