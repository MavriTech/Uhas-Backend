const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Announcement", announcementSchema);
