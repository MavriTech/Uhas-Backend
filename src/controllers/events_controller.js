const Event = require("../models/events");
const User = require("../models/admin");
const MessageHandler = require("../../utils/message_handler");
const cloudinary = require("../../utils/cloudinary");

const eventController = {
  //GET ALL EVENTS
  getAllEvents: async (req, res) => {
    let events;
    try {
      events = await Event.find();
    } catch (e) {
      const errorMessage = new MessageHandler(true, `${e.message}`);
      return res.status(500).json(errorMessage);
    }

    if (!events || events.length === 0) {
      const errorMessage = new MessageHandler(true, "No event found");
      return res.status(404).json(errorMessage);
    }
    const succesMessage = new MessageHandler(false, "success", events);
    return res.status(200).json(succesMessage);
  },

  addEvent: async (req, res) => {
    const { title, venue, description } = req.body;

    try {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      const url_image = uploadResult.secure_url;
      const newEvent = new Event({
        title,
        venue,
        description,
        image: url_image,
      });

      await newEvent.save();

      const succesMessage = new MessageHandler(false, "success", newEvent);
      return res.status(201).json(succesMessage);
    } catch (error) {
      const errorMessage = new MessageHandler(true, `${error.message}`);
      return res.status(500).json(errorMessage);
    }
  },

  deleteEvent: async (req, res) => {
    const eventId = req.params.id;
    try {
      const deletedEvent = await Event.findByIdAndDelete({ _id: eventId });
      if (!deletedEvent) {
        const errorMessage = new MessageHandler(true, "Event does not exist");
        res.status(400).json(errorMessage);
      }

      const succesMessage = new MessageHandler(false, "success", deletedEvent);
      return res.status(200).json(succesMessage);
    } catch (e) {
      const errorMessage = new MessageHandler(true, `${e.message}`);
      res.status(500).json(errorMessage);
    }
  },
};
module.exports = eventController;
