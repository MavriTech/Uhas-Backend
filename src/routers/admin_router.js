const express = require("express");
const router = express.Router();
const adminContoller = require("../controllers/admin_controller.js")

router.get('/',adminContoller.getAdmins);
router.post('/',adminContoller.addAdmin);



module.exports = router;