const { Users } = require("../models/users");

const authorization = async (req, res, next) => {
  const apiKey = req.header("x-api-key");
  let user = await Users.findOne({ apiKey: apiKey });
  if (!user) {
    res.status(401).send({ message: "This user is not authorized" });
  }
  return next();
};

module.exports = { authorization };
