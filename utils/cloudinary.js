const cloundinary = require("cloudinary").v2;
require("dotenv").config();

cloundinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRETKEY,
});

module.exports = cloundinary;
