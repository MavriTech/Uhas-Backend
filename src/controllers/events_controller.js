const Event = require("../models/events");
const User = require("../models/admin");

const eventController = {
  //GET ALL EVENTS
  getAllEvents: async (req, res, next) => {
    let events;
    try {
      events = await Event.find({}, { _id: 0, __v: 0 });
    } catch (e) {
      return res.status(404).json({
        error: true,
        message: "No event found",
      });
    }

    if (!events || events.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No event found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "success",
      data: events,
    });
  },

  addEvent: async (req, res, next) => {
    const { email, title, venue, description } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      
      if (!existingUser) {
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
      }
      const newEvent = new Event({
        email,
        title,
        venue,
        description,
      });

      await newEvent.save();

      const { _id, __v, ...newEventResponse } = newEvent.toObject();

      return res.status(201).json({
        error: false,
        message: "Success",
        data: newEventResponse,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  },
};
module.exports = eventController;
