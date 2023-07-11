const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    venue: {
      type: String,
      required: [true, "Venue is required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
