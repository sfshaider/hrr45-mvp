const jwt = require("jwt-then");
const secret = require ("../database/secret.js")

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "ERROR";
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, secret);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({
      message: "ERROR",
    });
  }
};