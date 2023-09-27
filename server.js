const express = require("express");
const cors = require("cors");
const compression = require("compression");
const errorHandler = require("./src/middlewares/error_handler");
const notFoundErrorHandler = require("./src/middlewares/404_error_handler");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const adminRouter = require("./src/routes/admin_router");
const eventRouter = require("./src/routes/events_router");
const announcementRouter = require("./src/routes/announcement_router");
const feedBackRouter = require("./src/routes/feedback_router");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/api", (req, res) => {
  res.render("index");
});

// MIDDLEWARES
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/admins", adminRouter);
app.use("/api/events", eventRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/feedbacks", feedBackRouter);

//ERROR HANDLING MIDDLEWARES
app.use(notFoundErrorHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server has started running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });
