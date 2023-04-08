const mongoose = require("mongoose");

const setupDb = async (mongoURL) => {
  const connect = await mongoose.connect(mongoURL);
  collection = mongoose.db("chat-messages").collection("messages");
  connect.connection.addListener("connect", () => {
    console.log("MongoDB was connected");
  });

  connect.connection.addListener("error", (err) => {
    console.error("Error on mongo connection", err);
  });

  return connect;
};

module.exports = { setupDb };
