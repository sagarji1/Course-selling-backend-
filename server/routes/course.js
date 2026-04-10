const { Router } = require("express");
const courseRouter = Router();
const courseModel = require("../models/course.model");

courseRouter.get("/allCourses", async (req, res) => {
  try {
    const courses = await courseModel.find({});
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ mag: "internal server error" });
  }
});

courseRouter.get("/courses/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }
    res.json({ course });
  } catch (err) {
    res.status(500).json({ mag: "internal server error" });
  }
});

module.exports = {
  courseRouter: courseRouter,
};
