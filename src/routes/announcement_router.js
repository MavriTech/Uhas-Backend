const express = require("express");
const announcementController = require("../controllers/announcement_controller");
const verify = require("../middlewares/verify_token");
const image_handler = require("../middlewares/image_handler");

const announcementRouter = express.Router();

announcementRouter.get("/",announcementController.getAllAnnouncements);
announcementRouter.post(
  "/",
  verify,
  image_handler.single('image'),
  announcementController.addAnnouncement
);
announcementRouter.delete(
  "/:id",
  verify,
  announcementController.deleteAnnouncement
);

module.exports = announcementRouter;
