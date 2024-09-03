const express = require("express");
const { getAllStats } = require("../controllers/admin");

const { auth, allowedTo } = require("../controllers/auth.js");

const router = express.Router();

router.route("/getStats").get(auth, allowedTo("admin", "manager"), getAllStats);
module.exports = router;
