const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },

    fullName: {
      type: String,
    },

    phone: {
      type: String,
    },

    resourceSuggest: {
      type: String,
      required: [true, "Resource Suggestion is required"],
    },

    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedBackSchema);
