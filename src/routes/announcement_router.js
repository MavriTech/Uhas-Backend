const express = require("express");
const announcementController = require("../controllers/announcement_controller");
const announcement = require("../models/announcement");
const verify = require("../middlewares/verify_token");

const announcementRouter = express.Router();

announcementRouter.get("/", verify, announcementController.getAllAnnouncements);
announcementRouter.post("/", verify, announcementController.addAnnouncement);
announcementRouter.delete(
  "/:id",
  verify,
  announcementController.deleteAnnouncement
);

module.exports = announcementRouter;
