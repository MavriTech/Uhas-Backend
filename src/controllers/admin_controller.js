const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/admin");

const adminContoller = {
  // GET ALL ADMINS
  getAdmins: async (req, res, next) => {
    let users;
    try {
      users = await User.find();
    } catch (error) {
      console.log(error);
    }

    if (!users) {
      res.status(404).json({
        error: true,
        message: "No user found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Success",
      "data:": users,
    });
  },

  getAdminById: (req, res, next) => {},

  //SIGN UP
  addAdmin: async (req, res, next) => {
    const { name, email, password } = req.body;

    let existinguser;
    try {
      existinguser = await User.findOne({ email });
    } catch (error) {
      console.log(error);
    }

    if (existinguser) {
      res.status(400).json({
        error: true,
        message: "User already exists",
      });
    }

    const hasdhedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hasdhedpassword,
    });

    try {
      await newUser.save();
    } catch (error) {
      console.log(error);
    }
    const { _id, __v, ...userResponse } = newUser.toObject();
    res.status(201).json({
      error: false,
      message: "Success",
      data: userResponse,
    });
  },

  // UPDATE ADMIN

  //   updateAdminByEmail: async (req, res, next) => {
  //     const { email, name, password } = req.body;

  //     try {
  //       let updatedFields = { name };

  //       if (password) {
  //         const hashedPassword = await bcrypt.hash(password, 10);
  //         updatedFields = { ...updatedFields, password: hashedPassword };
  //       }

  //       const updatedAdmin = await Admin.findOneAndUpdate(
  //         { email },
  //         updatedFields,
  //         { new: true }
  //       );

  //       if (!updatedAdmin) {
  //         return res.status(404).json({
  //           error: true,
  //           message: "Admin not found",
  //         });
  //       }

  //       const { password: omitPassword, ...adminResponse } =
  //         updatedAdmin.toObject();

  //       res.status(200).json({
  //         error: false,
  //         message: "Success",
  //         data: adminResponse,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       return res.status(500).json({
  //         error: true,
  //         message: "Internal Server Error",
  //       });
  //     }
  //   },
};

module.exports = adminContoller;
