const express = require("express");
const announcementController = require("../controllers/announcement_controller");
const announcement = require("../models/announcement");

const announcementRouter = express.Router();

announcementRouter.get("/", announcementController.getAllAnnouncements);
announcementRouter.post("/", announcementController.addAnnouncement);

module.exports = announcementRouter;
