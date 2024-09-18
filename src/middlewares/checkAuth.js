const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const config = require("../config");

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: "fail",
      msg: "No token provided",
    });
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(httpStatus.UNAUTHORIZED).json({
          status: "fail",
          msg: "Token has expired",
        });
      } else {
        return res.status(httpStatus.UNAUTHORIZED).json({
          status: "fail",
          msg: "Invalid token",
        });
      }
    }

    req.user = decoded.id;
    next();
  });
};

module.exports = checkAuth;
