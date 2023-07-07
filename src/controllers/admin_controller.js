const express = require("express");

const adminContoller = {
  getAdmins: (req, res) => {
    res.status(200).json({
      error: false,
      message: "Success",
      "data:": [],
    });
  },

  getAdminById: (req, res) => {
    res.status(200).json({
      error: false,
      message: "Success",
      data: {},
    });
  },

  addAdmin: (req, res) => {
    res.status(201).json({
      error: false,
      message: "Success",
      data: {},
    });
  },
};

module.exports = adminContoller;
