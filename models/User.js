const mongoose = require("mongoose");
const joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  biz: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

const registerSchema = joi.object({
  name: joi.string().regex(/^[^<>&%+=/\\$@!?*]+$/).min(2).required(),
  email: joi.string().email().min(6).required(),
  password: joi.string().min(8).required(),
  biz: joi.boolean().required(),
});

const loginSchema = joi.object({
  email: joi.string().email().min(6).required(),
  password: joi.string().min(8).required(),
});

exports = registerValidation = async function(payload) {
  return registerSchema.validate(payload)
};

exports = loginValidation = async function(payload) {
  return loginSchema.validate(payload);
};

module.exports = User;