const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: { type: String },
  password: { type: String },
});

const Users = new model("users", schema, "users");

module.exports = { Users };
