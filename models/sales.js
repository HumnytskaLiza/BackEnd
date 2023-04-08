const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  _id: { type: Types.ObjectId },
  saleDate: { type: Date },
  storeLocation: { type: String },
  customer: {
    gender: { type: String },
    age: { type: Number },
    email: { type: String }
  },
  items: [
    {
      tags: [
        { type: String }
      ]
    }
  ],
  couponUsed: { type: Boolean }
});

const Sales = new model("sales", schema, "sales");

module.exports = { Sales };
