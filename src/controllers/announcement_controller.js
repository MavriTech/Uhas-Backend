const Announcement = require("../models/announcement");
const User = require("../models/admin");
const MessageHandler = require("../../utils/message_handler");

const announcementController = {
  //GET ALL ANNOUNCEMENT
  getAllAnnouncements: async (req, res, next) => {
    let announcements;
    try {
      announcements = await Announcement.find({}, { __v: 0 });
    } catch (e) {
      const errorMessage = new MessageHandler(true, "No announcement found");
      return res.status(404).json(errorMessage);
    }

    if (!announcements || announcements.length === 0) {
      const errorMessage = new MessageHandler(true, "No announcement found");
      return res.status(404).json(errorMessage);
    }

    const succesMessage = new MessageHandler(false, "success", announcements);
    return res.status(200).json(succesMessage);
  },

  //POST AN ANNOUNCEMENT
  addAnnouncement: async (req, res, next) => {
    const { email, title, description } = req.body;

    try {
      const existinguser = await User.findOne({ email });
      if (!existinguser) {
        const errorMessage = new MessageHandler(true, "User not found");
        return res.status(404).json(errorMessage);
      }
      const newAnnouncement = new Announcement({
        email,
        title,
        description,
      });

      await newAnnouncement.save();
      existinguser.announcement.push(newAnnouncement);
      await existinguser.save();

      const { __v, ...newAnnouncementResponse } = newAnnouncement.toObject();
      const succesMessage = new MessageHandler(
        false,
        "success",
        newAnnouncementResponse
      );
      return res.status(201).json(succesMessage);
    } catch (error) {
      const errorMessage = new MessageHandler(true, "User not found");
      return res.status(404).json(errorMessage);
    }
  },

  //DELETE ANNONCEMENT
  deleteAnnouncement: async (req, res, nex) => {
    const announcementId = req.params.id;

    try {
      const deletedAnnouncement = await Announcement.findByIdAndDelete(
        announcementId
      );
      if (!deletedAnnouncement) {
        const errorMessage = new MessageHandler(true, "Announcement not found");
        res.status(404).json(errorMessage);
      }
      const user = await User.findOne({ email: deletedAnnouncement.email });
      if (user) {
        user.announcement.pull(announcementId);
        await user.save();
      }
      deletedAnnouncement.__v = undefined;
      const succesMessage = new MessageHandler(
        false,
        "success",
        deletedAnnouncement
      );

      return res.status(200).json(succesMessage);
    } catch (error) {
      const errorMessage = new MessageHandler(true, `${error}`);
      res.status(400).json(errorMessage);
    }
  },
};

module.exports = announcementController;
