const Announcement = require("../models/announcement");
const User = require("../models/admin");
const MessageHandler = require("../../utils/message_handler");
const cloudinary = require("../../utils/cloudinary");

const announcementController = {
  //GET ALL ANNOUNCEMENT
  getAllAnnouncements: async (req, res) => {
    let announcements;
    try {
      announcements = await Announcement.find();
    } catch (e) {
      const errorMessage = new MessageHandler(true, `${e}`);
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
  addAnnouncement: async (req, res) => {
    const { title, description } = req.body;

    try {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      const image_url = uploadResult.secure_url;

      const newAnnouncement = new Announcement({
        title,
        description,
        image: image_url,
      });

      await newAnnouncement.save();

      const successMessage = new MessageHandler(
        false,
        "success",
        newAnnouncement
      );
      return res.status(201).json(successMessage);
    } catch (error) {
      const errorMessage = new MessageHandler(true, `${error}`);
      return res.status(500).json(errorMessage);
    }
  },

  //DELETE ANNONCEMENT
  deleteAnnouncement: async (req, res) => {
    const announcementId = req.params.id;

    try {
      const deletedAnnouncement = await Announcement.findByIdAndDelete({
        _id: announcementId,
      });
      if (!deletedAnnouncement) {
        const errorMessage = new MessageHandler(true, "Announcement not found");
        res.status(404).json(errorMessage);
      }
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
