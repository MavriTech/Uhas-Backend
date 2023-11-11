const eventController = require("../controllers/events_controller");
const express = require("express");
const verify = require("../middlewares/verify_token");
const upload = require("../middlewares/image_handler");

const eventRouter = express.Router();

eventRouter.get("/", verify, eventController.getAllEvents);
eventRouter.post("/", verify, upload.single("image"), eventController.addEvent);
eventRouter.delete("/:id", verify, eventController.deleteEvent);

module.exports = eventRouter;
