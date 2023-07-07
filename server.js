const express = require("express");
const adminRouter = require("./src/routers/admin_router");
const PORT = process.env.PORT || 3000;

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log("Server has started running on port 3000");
});
