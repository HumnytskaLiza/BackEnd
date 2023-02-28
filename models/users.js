const { Schema, Types, model } = require("mongoose");

const schema = new Schema({
  _id: { type: Types.ObjectId },
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

const Users = new model("users", schema, "users");

module.exports = { Users };
