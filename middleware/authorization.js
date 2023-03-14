const { Users } = require("../models/users");

const authorization = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  let user = Users.findOne({ apiKey: apiKey });
  if (!user) {
    return res.status(401).send({ message: "This user is not authorized" });
  }
  return next();
};

module.exports = { authorization };
