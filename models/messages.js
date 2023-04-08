const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  messageId: { type: String },
  userName: { type: String },
  text: { type: String },
  createdAt: { type: Date },
});

const Messages = new model("messages", schema, "messages");

module.exports = { Messages };
