const eventController = require("../controllers/events_controller")
const express = require("express")

const router = express.Router();


router.get("/",eventController.getAllEvents);
router.post("/",eventController.addEvent)

module.exports = router;