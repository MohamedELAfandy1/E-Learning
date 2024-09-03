const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { fs } = require("node:fs");

const lectureModel = require("../models/lecturesModel");
const factory = require("./handlersFactory");
const apiError = require("../Utils/apiError");
const courseModel = require("../models/courseModel");

exports.uploadVideo = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/lectures");
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      const filename = `Lecture-${uuidv4()}-${Date.now()}.${ext}`;
      cb(null, filename);
    },
  }),
}).single("video");


exports.getAllLecturesForSpeceficCourse = asyncHandler(
  async (req, res, next) => {
    const course = await courseModel.findById(req.params.courseId);
    if (!course) {
      return next(new apiError("No Course For This ID", 404));
    }
    const lectures = await lectureModel.find({ course });
    if (
      req.user.role == "user" &&
      !req.user.subscreption.includes(course._id)
    ) {
      return next(new apiError("You Have Not Subsciped To This Course", 404));
    }
    res.json({ lectures });
  }
);

exports.getLectureById = asyncHandler(async (req, res, next) => {
  const lecture = await lectureModel.findById(req.params.lectureId);
  if (!lecture) {
    return next(new apiError("No Lecture For This ID", 404));
  }
  if (
    req.user.role == "user" &&
    !req.user.subscreption.includes(lecture.course._id)
  ) {
    return next(new apiError("You Have Not Subscriped To This Course", 404));
  }
  res.json({ lecture });
});

exports.addLectureForCourse = asyncHandler(async (req, res, next) => {
  const course = await courseModel.findById(req.params.courseId);
  if (!course) {
    return next(new apiError("No Course For This ID", 404));
  }
  req.body.course = course;
  req.body.video = req.file.filename;

  const lecture = await lectureModel.create(req.body);
  res.json(lecture);
});

exports.deleteLecture = asyncHandler(async (req, res, next) => {
  const lecture = await lectureModel.findById(req.params.lectureId);
  if (!lecture) {
    return next(new apiError("No Lecture For This ID", 404));
  }

  // const chunks = lecture.video.split("/");
  // const videoName = `${chunks[chunks.length - 1]}`;
  // fs.rm(videoName, () => {
  //   console.log("Video Deleted");
  // });
  await lectureModel.deleteOne({ _id: lecture._id });
  res.status(204).send();
});


