const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const courseModel = require("../../models/courseModel");
const userModel = require("../../models/userModel");

exports.createCourseValidator = [
  check("name")
    .notEmpty()
    .withMessage("Course Name Required")
    .custom((value) =>
      courseModel.findOne({ name: value }).then((course) => {
        if (course) {
          return Promise.reject(
            new Error("Already There Is Course With This Name")
          );
        }
      })
    ),
  check("description").notEmpty().withMessage("Course description Required"),
  check("price").notEmpty().withMessage("Course price Required"),
  check("duration").notEmpty().withMessage("Course duration Required"),
  check("category").notEmpty().withMessage("Course category Required"),

  validatorMiddleware,
];

exports.getCourseValidator = [
  check("id").isMongoId().withMessage("Invalid Course ID Format"),
  validatorMiddleware,
];
exports.deleteCourseValidator = [
  check("id").isMongoId().withMessage("Invalid Course ID Format"),
  validatorMiddleware,
];
exports.updateCourseValidator = [
  check("id").isMongoId().withMessage("Invalid Course ID Format"),
  check("name")
    .optional()
    .custom((value) =>
      courseModel.findOne({ name: value }).then((course) => {
        if (course) {
          return Promise.reject(
            new Error("Already There Is Course With This Name")
          );
        }
      })
    ),

  validatorMiddleware,
];

exports.addCourseToUserValidator = [
  check("email")
    .notEmpty()
    .withMessage("User Email Is Required")
    .isEmail()
    .withMessage("Invalid Email Address")
    .custom((value) =>
      userModel.findOne({ email: value }).then((user) => {
        if (!user) {
          return Promise.reject(new Error("Email Is Not Found"));
        }
      })
    ),
  check("courseId").isMongoId().withMessage("Invalid Id Format"),
  validatorMiddleware,
];

