const multer = require("multer");


const getDestination = (req, file, callback) => {
  callback(null, "images");
};


const getFilename = (req, file, callback) => {
  const originalName = file.originalname;
  const extension = originalName.split(".").pop(); 
  const timestamp = Date.now();
  const modifiedName = originalName.replace(/\s+/g, "_");

  const filename = `${modifiedName}_${timestamp}.${extension}`;
  callback(null, filename);
};


const storage = multer.diskStorage({
  destination: getDestination,
  filename: getFilename,
});


const upload = multer({ storage });

module.exports = upload;
