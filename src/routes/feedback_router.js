const express = require("express");
const feedbackRouter = express.Router();
const feedBackController = require("../controllers/feedBack_controller");

feedbackRouter.get("/", feedBackController.getAllFeedBacks);
feedbackRouter.post("/", feedBackController.addFeedback);
feedbackRouter.delete("/");
feedbackRouter.put("/");

module.exports = feedbackRouter;
