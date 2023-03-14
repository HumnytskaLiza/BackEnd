const { Users } = require("../models/users");

const registration = (req, res, next) => {
  const { email } = req.body;
  let check = Users.findOne({ email: email });
  if (check) {
    return res.status(400).send({ message: "This email is already in use" });
  }
  if (!email) {
    return res.status(400).send({ message: "This field <email> is required" });
  }
  return next();
};

module.exports = { registration };
