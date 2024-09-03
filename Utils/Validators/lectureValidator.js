const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const lectureModel = require("../../models/lecturesModel");

exports.addLectureForCourseValidator = [
  check("courseId").isMongoId().withMessage("Invalid Course ID Format"),
  check("title")
    .notEmpty()
    .withMessage("Lecture Title Is Required")
    .custom((value, { req }) =>
      lectureModel.findOne({ title: value, course:req.params.courseId }).then((lecture) => {
        if (lecture) {
          return Promise.reject(
            new Error("Already There Is Lecture With This Name In This Course")
          );
        }
      })
    ),
  check("description").notEmpty().withMessage("Lecture description Required"),

  validatorMiddleware,
];

exports.getLectureValidator = [
  check("lectureId").isMongoId().withMessage("Invalid Lecture ID Format"),
  validatorMiddleware,
];
exports.deleteLectureValidator = [
  check("lectureId").isMongoId().withMessage("Invalid Lecture ID Format"),
  validatorMiddleware,
];
exports.GetAllLecturesForSpeceficCourseValidator = [
  check("courseId").isMongoId().withMessage("Invalid Course ID Format"),
  validatorMiddleware,
];
