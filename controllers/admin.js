const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const apiError = require("../Utils/apiError");
const courseModel = require("../models/courseModel");
const lectureModel = require("../models/lecturesModel");
const userModel = require("../models/userModel");

exports.getAllStats = asyncHandler(async (req, res, next) => {
  const totalCourses = (await courseModel.find()).length;
  const totalLectures = (await lectureModel.find()).length;
  const totalUsers = (await userModel.find()).length;
  const stats = { totalCourses, totalLectures, totalUsers };
  res.status(200).json(stats);
});
