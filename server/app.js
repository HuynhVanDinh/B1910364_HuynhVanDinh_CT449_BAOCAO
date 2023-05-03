const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const multer = require("multer");

const serviceRoute = require("./app/routes/service.route");
const userRoute = require("./app/routes/user.route");
const orderRoute = require("./app/routes/order.route");
const infoRoute = require("./app/routes/info.route");
const acceptOrder = require("./app/routes/acceptOrder");

const checkUser = require("./app/middlewares/check_user");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public/images"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Project. This is PartyPLanner." });
});

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image!!!!!!!!!"), false);
    }
    cb(null, true);
  },
});

app.use("/api/services", checkUser, upload.single("image"), serviceRoute);
app.use("/api/users", userRoute);
app.use("/api/patients", checkUser, orderRoute);
app.use("/api/info", checkUser, infoRoute);
app.use("/api/allOrders", checkUser, acceptOrder);

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
