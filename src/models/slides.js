const mongoose = require("mongoose");

const slidesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  file: {
    type: String,
    required: [false, "File upload is required"],
  },
});

module.exports = mongoose.model("Slides", slidesSchema);