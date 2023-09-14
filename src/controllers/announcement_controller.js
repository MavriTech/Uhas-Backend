const Announcement = require("../models/announcement");
const User = require("../models/admin");

const announcementController = {
  //GET ALL EVENTS
  getAllAnnouncements: async (req, res, next) => {
    let announcements;
    try {
      announcements = await Announcement.find({}, { __v: 0 });
    } catch (e) {
      return res.status(404).json({
        error: true,
        message: "No announcement found",
      });
    }

    if (!announcements || announcements.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No announcement found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "success",
      data: announcements,
    });
  },

  addAnnouncement: async (req, res, next) => {
    const { email, title, description } = req.body;

    try {
      const existinguser = await User.findOne({ email });
      if (!existinguser) {
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
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
      return res.status(201).json({
        error: false,
        message: "Success",
        data: newAnnouncementResponse,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }
  },

  deleteAnnouncement: async (req, res, nex) => {
    const  announcementId  = req.params.id;

    try {
      const deletedAnnouncement = await Announcement.findByIdAndDelete(announcementId);
      if (!deletedAnnouncement) {
        res.status(404).json({
          error: "true",
          message: "Announcement not found",
        });
      } 
      const user = await User.findOne({email: deletedAnnouncement.email});
      if (user) {
        user.announcement.pull(announcementId);
        await user.save();
      }

      return res.status(200).json({
        error: false,
        message: 'Announcement deleted',
        data: deletedAnnouncement,
      });
    } catch (error) {}
  },
};

module.exports = announcementController;
