const jwt = require("jsonwebtoken");
const User = require("../db/models/User");
const { UnauthenticatedError } = require("../errors");

const isUserAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findOne({ _id: decoded.id });

    if (!user) throw new UnauthenticatedError("Unauthorized access");

    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized access");
  }
};

module.exports = isUserAuthenticated;
