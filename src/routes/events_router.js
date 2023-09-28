const eventController = require("../controllers/events_controller");
const express = require("express");
const verify = require("../middlewares/verify_token");
const upload = require("../middlewares/image_handler")

const router = express.Router();

router.get("/", verify,upload.single('image') ,eventController.getAllEvents);
router.post("/", verify, eventController.addEvent);
router.delete("/:id", verify, eventController.deleteEvent);

module.exports = router;
