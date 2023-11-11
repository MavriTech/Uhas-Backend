const Course = require("../models/course");
const MessageHandler = require("../../utils/message_handler");

const courseController = {
  getAllCourses: async (req, res) => {
    let courses;

    try {
      courses = await Course.find();
    } catch (e) {
      const errorMessage = new MessageHandler(true, `${e.message}`);
      return res.status(500).json(errorMessage);
    }

    if (!courses || courses.length === 0) {
      const errorMessage = new MessageHandler(true, "No course found");
      return res.status(404).json(errorMessage);
    }

    const succesMessage = new MessageHandler(false, "success", courses);
    return res.status(200).json(succesMessage);
  },

  addCourse: async (req, res) => {
    const { title } = req.body;

    let existingCourse;
    try {
      existingCourse = await Course.findOne({ title });
    } catch (error) {
      const errorMessage = new MessageHandler(true, `${error}`);
      return res.stats(404).json(errorMessage);
    }

    if (existingCourse) {
      const errorMessage = new MessageHandler(true, "Course already exists");
      return res.status(409).json(errorMessage);
    }

    try {
      const newCourse = new Course({ title });

      await newCourse.save();

      const succesMessage = new MessageHandler(false, "sucess", newCourse);
      return res.status(200).json(succesMessage);
    } catch (error) {
      const errorMessage = new MessageHandler(true, `${error}`);
      return res.status(500).json(errorMessage);
    }
  },
};

module.exports = courseController;
