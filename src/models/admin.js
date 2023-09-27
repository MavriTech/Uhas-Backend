const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlenght: [8, "Password must be at least 8 characters"],
    },

    // events: {
    //   type: Array,
    // },

    // announcement: {
    //   type: Array,
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
