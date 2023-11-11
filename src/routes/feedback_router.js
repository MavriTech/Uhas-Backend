const express = require("express");
const feedbackRouter = express.Router();
const feedBackController = require("../controllers/feedBack_controller");
const verify = require("../middlewares/verify_token");

feedbackRouter.get("/", feedBackController.getAllFeedBacks);
feedbackRouter.post("/", verify, feedBackController.addFeedback);
feedbackRouter.delete("/");
feedbackRouter.put("/");

module.exports = feedbackRouter;
