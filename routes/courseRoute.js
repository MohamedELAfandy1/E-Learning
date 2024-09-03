const express = require("express");
const {
  getAllCourses,
  getCouseById,
  createCourse,
  deleteCourse,
  updateCourse,
  getMyCourses,
  getCourseUsers,
  addCourseToUser,
  removeCourseFromUser,
  uploadCourseImage,
  resizeCourseImage,
} = require("../controllers/course");

const {
  createCourseValidator,
  getCourseValidator,
  updateCourseValidator,
  deleteCourseValidator,
  addCourseToUserValidator,
} = require("../Utils/Validators/courseValidator");

const { auth, allowedTo } = require("../controllers/auth.js");

const router = express.Router();
router.get("/getMyCourses", auth, getMyCourses);

router.get(
  "/getCourseUsers/:courseId",
  auth,
  allowedTo("admin", "manager"),
  getCourseUsers
);

router.post(
  "/addCourseToUser/:courseId",
  auth,
  allowedTo("admin", "manager"),
  addCourseToUserValidator,
  addCourseToUser
);

router.delete(
  "/removeCourseFromUser/:courseId",
  auth,
  allowedTo("admin", "manager"),
  addCourseToUserValidator,
  removeCourseFromUser
);

router
  .route("/")
  .get(getAllCourses)
  .post(
    auth,
    allowedTo("admin", "manager"),
    uploadCourseImage,
    resizeCourseImage,
    createCourseValidator,
    createCourse
  );

router
  .route("/:id")
  .get(getCourseValidator, getCouseById)
  .put(
    auth,
    allowedTo("admin", "manager"),
    uploadCourseImage,
    resizeCourseImage,
    updateCourseValidator,
    updateCourse
  )
  .delete(
    auth,
    allowedTo("admin", "manager"),
    deleteCourseValidator,
    deleteCourse
  );

module.exports = router;
