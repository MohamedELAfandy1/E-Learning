const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const courseModel = require("../models/courseModel");
const factory = require("./handlersFactory");
const apiError = require("../Utils/apiError");
const { uploadSingleImage } = require("../middleware/imageUpload");
const userModel = require("../models/userModel");
const lectureModel = require("../models/lecturesModel");

exports.uploadCourseImage = uploadSingleImage("image");

exports.resizeCourseImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `Course-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/courses/${filename}`);

    req.body.image = filename;
  }
  next();
});

exports.getAllCourses = factory.getAll(courseModel);

exports.getCouseById = factory.getOne(courseModel);

exports.createCourse = factory.createOne(courseModel);

exports.updateCourse = factory.updateOne(courseModel);

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await courseModel.findById(req.params.id);
  if (!course) {
    return next(new apiError("No Course For This ID"));
  }
  await lectureModel.deleteMany({ course: course._id });

  const users = await userModel.find({ subscreption: course._id });

  const result = await userModel.updateMany(
    { subscreption: course._id },
    { $pull: { subscreption: course._id } }
  );
  await courseModel.findByIdAndDelete(course._id);

  res.status(204).send();
});

exports.getMyCourses = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    return next(new apiError("No User For This ID"));
  }
  courses = user.subscreption;
  res.status(200).json({ data: courses });
});

exports.addCourseToUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOneAndUpdate(
    { email: req.body.email },
    {
      $addToSet: { subscreption: req.params.courseId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    data: user.subscreption,
  });
});
exports.removeCourseFromUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOneAndUpdate(
    { email: req.body.email },
    {
      $pull: { subscreption: req.params.courseId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    data: user.subscreption,
  });
});
exports.getCourseUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({ subscreption: req.params.courseId });

  res.status(200).json({
    users,
  });
});
