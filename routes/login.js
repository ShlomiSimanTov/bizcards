const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const {value, error} = await loginValidation(req.body);
    if (error) return res.status(400).send(error.message);
    let user = await User.findOne({email: value.email});
    if (!user) return res.status(404).send("Wrong details");
    const compareResult = await bcrypt.compare(
      value.password,
      user.password
    );
    if (!compareResult) return res.status(400).send("Wrong details");
    const genToken = jwt.sign(
      {_id: user._id, biz: user.biz},
      process.env.jwtKey
    );
    res.status(200).send({token: genToken});
  } catch (error) {
    res.status(400).send("Error in login" + error);
  }
});
  
module.exports = router;