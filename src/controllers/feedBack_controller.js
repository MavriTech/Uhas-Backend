const Feedback = require("../models/feedback");

const feedBackController = {
  getAllFeedBacks: async (req, res) => {
    let feedbacks;
    try {
      feedbacks = await Feedback.find({}, { __v });
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

  addFeedback: async (req, res) => {
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

      
      return res.status(200).json({
        error: false,
        message: "Success",
        data: newFeedback,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Internal server error",
      });
    }
  },
};

module.exports = feedBackController;
