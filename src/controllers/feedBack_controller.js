const Feedback = require("../models/feedback");

const feedBackController = {
  getAllFeedBacks: async (req, res, nexr) => {
    let feedbacks;
    try {
      feedbacks = await Feedback.find();
    } catch (error) {
      console.log(error);
    }

    if (!feedbacks || feedbacks.length === 0) {
      res.status(404).json({
        error: true,
        message: "No feedback found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Success",
      "data:": feedbacks,
    });
  },

  addFeedback: async (req, res, next) => {
    const { email, fullName, phone, resourceSuggest, note } = req.body;

    try {
      const newFeedback = new Feedback({
        email,
        fullName,
        phone,
        resourceSuggest,
        note,
      });
      await newFeedback.save();

      const { _id, __v, ...newFeedbackResponse } = newFeedback.toObject();

      return res.status(200).json({
        error: false,
        message: "Success",
        data: newFeedbackResponse,
      });
    } catch (error) {}
  },
};

module.exports = feedBackController;
