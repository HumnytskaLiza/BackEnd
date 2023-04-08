const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  event: { type: String },
  messageId: { type: String },
  userName: { type: String },
  text: { type: String },
  date: { type: Date },
});

const Messages = new model("messages", schema, "messages");

module.exports = { Messages };
