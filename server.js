const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./src/routes/admin_router");
const eventRouter = require("./src/routes/events_router");
const announcementRouter = require("./src/routes/announcement_router");
const feedBackRouter = require("./src/routes/feedback_router");
const compression = require("compression");

const MONGOURL =
  "mongodb+srv://mavritech07:Mavritech123@cluster0.izwbgtx.mongodb.net/Namsa-website";
const PORT = process.env.PORT || 4000;

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admins", adminRouter);
app.use("/api/events", eventRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/feedbacks", feedBackRouter);

//ERROR HANDLING MIDDLEWARES
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: errorMessage });
});

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server has started running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });
