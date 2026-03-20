const mongoose = require("mongoose");
const validator = require("validator")

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  weather: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: {true: "The image field is required"},
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL.",
    },
  },
});

module.exports = mongoose.models("clothingItem", clothingItemSchema);