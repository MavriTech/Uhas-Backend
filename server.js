const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./src/routers/admin_router");
const MONGOURL =
  "mongodb+srv://mavritech07:Mavritech123@cluster0.izwbgtx.mongodb.net/Namsa-website";
const PORT = process.env.PORT || 3000;

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

app.use("/api/admins", adminRouter);

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
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server has started running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`error:${e}`);
  });
