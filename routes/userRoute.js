const express = require('express');
const formController = require('../controllers/userController.js');

const multer = require("multer");
const path = require("path");
const router = express.Router();

const localStorage = multer.diskStorage({
  destination: (req, res, next) => {
    next(null, path.join(__dirname, "../public/uploads/users"));
  },
  filename: (req, file, next) => {
    next(null,file.originalname );
  },
});
var upload1 = multer({ storage: localStorage });

var cpUpload = upload1.fields([{ name: "files", maxCount: 10}]);

router.route('/user_register').post(cpUpload, formController.registerUser);

module.exports = router;