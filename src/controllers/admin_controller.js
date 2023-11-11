const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const JWT = require("jsonwebtoken");
const MessageHandler = require("../../utils/message_handler");

const adminContoller = {
  // GET ALL ADMINS
  getAdmins: async (req, res) => {
    let admins;
    try {
      admins = await Admin.find();
    } catch (error) {
      const errorMessage = new MessageHandler(true, `${error}`);
      return res.status(404).json(errorMessage);
    }

    if (!admins || admins.length === 0) {
      const errorMessage = new MessageHandler(true, `No admin found`);
     return res.status(404).json(errorMessage);
    }

    const succesMessage = new MessageHandler(false, "success", admins);
    return res.status(200).json(succesMessage);
  },

  getAdminById: (req, res) => {},

  //SIGN UP
  addAdmin: async (req, res) => {
    const { name, email, password } = req.body;

    let existinguser;
    try {
      existinguser = await Admin.findOne({ email });
    } catch (error) {
      const errorMessage = new MessageHandler(true, `${error}`);
      return res.stats(404).json(errorMessage);
    }

    if (existinguser) {
      const errorMessage = new MessageHandler(true, "Admin already exists");
     return res.status(409).json(errorMessage);
    }

    const hasdhedpassword = await bcrypt.hash(password, 10);
    const newUser = new Admin({
      name,
      email,
      password: hasdhedpassword,
    });

    try {
      await newUser.save();
    } catch (error) {
      const errorMessage = new MessageHandler(true, "Unable to save admin");
     return  res.status(500).json(errorMessage);
    }
    const succesMessage = new MessageHandler(false, "success", newUser);
    res.status(201).json(succesMessage);
  },

  // LOGIN
  loginAdmin: async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({
          error: true,
          message: "Provide email and password",
        });
      }

      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(404).json({
          error: true,
          message: "Admin not found",
        });
      }

      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (!passwordMatch) {
        return res.status(401).json({
          error: true,
          message: "Invalid password",
        });
      }

      const token = JWT.sign({ _id: admin._id }, process.env.SECRET_TOKEN, {
        expiresIn: "2 days",
      });

    return res.header("auth-token", token).send({
        error: false,
        token: token,
        admin: admin,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: `${error}`,
      });
    }
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
