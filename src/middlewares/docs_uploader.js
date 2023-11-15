const multer = require("multer");
const path = require("path");

const docsUploader = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      cb(new Error(" File type isn't supported"));
      return;
    }
    cb(null, true);
  },
});

module.exports = docsUploader;
