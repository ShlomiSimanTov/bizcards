const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const {value, error} = await registerValidation(req.body);
    if (error) return res.status(400).send(error.message);
    let user = await User.findOne({email: value.email});
    if (user) return res.status(400).send("User already exist");
    user = new User(value);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const genToken = jwt.sign(
      {_id: user._id, biz: user.biz},
      process.env.jwtKey
    );
    await user.save();
    res.status(201).send({token: genToken});
  } catch (error) {
    res.status(400).send("Error in register" + error);
  }
});

module.exports = router;