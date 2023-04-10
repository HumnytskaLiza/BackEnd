const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  userName: { type: String },
  status: { type: String },
});

const Users = new model("users", schema, "users");

module.exports = { Users };
