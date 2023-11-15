const Slides = require("../models/slides");
const MessageHandler = require("../../utils/message_handler");
const cloudinary = require("../../utils/cloudinary");

const slidesController = {
  getAllSlides: async (req, res) => {
    let slides;
    try {
      slides = await Slides.find();
      if (!slides || slides.length === 0) {
        const errorMessage = new MessageHandler(true, "No slides found");
        return res.status(404).json(errorMessage);
      } else {
        const succesMessage = new MessageHandler(false, "success", slides);
        return res.status(200).json(succesMessage);
      }
    } catch (error) {
      const errorMessage = new MessageHandler(true, `${error}`);
      return res.status(500).json(errorMessage);
    }
  },

  addSlide: async (req, res) => {
    const { title, description, course, file } = req.body;
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    const fileUrl = uploadResult.secure_url;
    try {
      const newSlide = new Slides({
        title,
        description,
        course,
        file: fileUrl,
      });

      await newSlide.save();
      const succesMessage = new MessageHandler(false, "success", newSlide);
      res.status(201).json(succesMessage);
    } catch (error) {
      const errorMessage = new MessageHandler(true, `${error}`);
      return res.status(500).json(errorMessage);
    }
  },

  deleteSlide: (req, res) => {},

  updateSlide: (req, res) => {},
};

module.exports = slidesController;
