const mongoose = require("mongoose");

const slidesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
    },
    file: {
      type: String,
      required: [false, "File upload is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slides", slidesSchema);
