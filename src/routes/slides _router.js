const express = require("express");
const slidesController = require("../controllers/slides_controller");
const slides_Handler = require("../middlewares/docs_uploader");

const slideRouter = express.Router();

slideRouter.get("/", slidesController.getAllSlides);
slideRouter.post("/", slides_Handler.single("file"), slidesController.addSlide);
slideRouter.delete("/:id", slidesController.deleteSlide);
slideRouter.put("/:id", slidesController.updateSlide);

module.exports = slideRouter;
