const express = require("express");
const {
  getAllLecturesForSpeceficCourse,
  getLectureById,
  addLectureForCourse,
  deleteLecture,
  uploadVideo,
} = require("../controllers/lecture");

const { auth, allowedTo } = require("../controllers/auth.js");
const {
  getLectureValidator,
  deleteLectureValidator,
  GetAllLecturesForSpeceficCourseValidator,
  addLectureForCourseValidator,
} = require("../Utils/Validators/lectureValidator.js");

const router = express.Router();

router
  .route("/:lectureId")
  .get(auth, getLectureValidator, getLectureById)
  .delete(
    auth,
    allowedTo("admin", "manager"),
    deleteLectureValidator,
    deleteLecture
  );

router
  .route("/course/:courseId/")
  .post(
    auth,
    allowedTo("admin", "manager"),
    uploadVideo,
    addLectureForCourseValidator,
    addLectureForCourse
  )
  .get(
    auth,
    GetAllLecturesForSpeceficCourseValidator,
    getAllLecturesForSpeceficCourse
  );

module.exports = router;
