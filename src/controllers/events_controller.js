const Event = require("../models/events");
const User = require("../models/admin");
const MessageHandler = require("../../utils/message_handler");

const eventController = {
  //GET ALL EVENTS
  getAllEvents: async (req, res, next) => {
    let events;
    try {
      events = await Event.find({}, { __v: 0 });
    } catch (e) {
      const errorMessage = new MessageHandler(true, "No event found");
      return res.status(404).json(errorMessage);
    }

    if (!events || events.length === 0) {
      const errorMessage = new MessageHandler(true, "No event found");
      return res.status(404).json(errorMessage);
    }
    const succesMessage = new MessageHandler(false, "success", events);
    return res.status(200).json(succesMessage);
  },

  addEvent: async (req, res, next) => {
    const { email, title, venue, description } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        const errorMessage = new MessageHandler(true, "User not found");
        return res.status(404).json(errorMessage);
      }
      const newEvent = new Event({
        email,
        title,
        venue,
        description,
      });

      await newEvent.save();

      const succesMessage = new MessageHandler(false, "success", newEvent);
      return res.status(201).json(succesMessage);
    } catch (error) {
      const errorMessage = new MessageHandler(true, "Internal Server Error");
      return res.status(500).json(errorMessage);
    }
  },

  deleteEvent: async (req, res, next) => {
    const eventId = req.params.id;
    try {
      const deletedEvent = await Event.findByIdAndDelete({ _id: eventId });
      if (!deletedEvent) {
        const errorMessage = new MessageHandler(true, "Event does not exist");
        res.status(400).json(errorMessage);
      }

      const user = await User.findOne({ email: deletedEvent.email });
      user.events.pull(eventId);
      await user.save();

      const succesMessage = new MessageHandler(false, "success", deletedEvent);
      return res.status(200).json(succesMessage);
    } catch (e) {}
  },
};
module.exports = eventController;
