// routes/userRoutes.js
const express = require('express');
const formController = require('../controllers/userController.js');
const upload = require('../middleware/upload.js'); // Correctly importing the Multer instance

const router = express.Router();

router.route('/user_register').post(upload.array('files', 10), formController.registerUser);

module.exports = router;
