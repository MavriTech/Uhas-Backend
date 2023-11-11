const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
    unique: true,
  },

  slides: {
    type: Array,                   
  },
});

module.exports = mongoose.model("Course", courseSchema);
