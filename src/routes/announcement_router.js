const express = require("express");
const announcementController = require("../controllers/announcement_controller");
const announcement = require("../models/announcement");

const announcementRouter = express.Router();

announcementRouter.get("/", announcementController.getAllAnnouncements);
announcementRouter.post("/", announcementController.addAnnouncement);
announcementRouter.delete("/:id", announcementController.deleteAnnouncement);

module.exports = announcementRouter;
