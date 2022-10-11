const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(401).send("Access denied. no token provided");
    let payload = jwt.verify(token, process.env.jwtKey);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
