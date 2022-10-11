const mongoose = require("mongoose");
const joi = require("joi");

const cardSchema = new mongoose.Schema({
    bizName: {
        type: String,
        required: true,
        minlength: 2,
    },
    bizDescription: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    bizAddress: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    bizImage: {
        type: String,
        required: true,
        minlength: 2,
    },
    bizPhone: {
        type: String,
        required: true,
        minlength: 8,
    },
    bizNumber: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
    },
    userId: {
        type: String,
        required: true,
    },
});

const Card = mongoose.model("cards", cardSchema);

const cardSchemaJoi = joi.object({
    bizName: joi.string().min(2).required(),
    bizDescription: joi.string().min(2).max(255).required(),
    bizAddress: joi.string().min(2).max(255).required(),
    bizPhone: joi.string().regex(/^[0-9()+-]{6,}$/).min(8).required(),
    bizImage: joi.string().min(2).required(),
  });

exports = cardValidation = async function(payload) {
    return cardSchemaJoi.validate(payload);
};

module.exports = Card;