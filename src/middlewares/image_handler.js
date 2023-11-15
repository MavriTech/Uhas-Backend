const multer = require("multer");
const path = require("path");

const ImageUploader = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("The file type isn't supported"), false);
      return;
    }
    cb(null, true);
  },
});

module.exports = ImageUploader;
                                                                                                                                                                                      