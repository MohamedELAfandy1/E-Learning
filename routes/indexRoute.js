const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const courseRoute = require("./courseRoute");
const lectureRoute = require("./lectureRoute");
const adminRoute = require("./adminRoute");

const mountRoutes = (app) => {
  app.use("/auth", authRoute);
  app.use("/user", userRoute);
  app.use("/course", courseRoute);
  app.use("/lecture", lectureRoute);
  app.use("/admin", adminRoute);
  app.use("/", (req, res, next) => {
    res.send("Server Is Running");
  });
};

module.exports = mountRoutes;
