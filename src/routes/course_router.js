const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/course_controller')

courseRouter.get("/",courseController.getAllCourses);
courseRouter.post("/",courseController.addCourse);
courseRouter.delete("/:id");
courseRouter.put("/:id");

module.exports = courseRouter;
