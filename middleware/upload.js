const multer = require('multer');
const path=require("path");
const storage = multer.diskStorage({
  
  
  destination: (req, res, next) => {
    // next(null, path.join(__dirname, "../public/users"));
  },
  destination: function (req, file, cb) {
    cb(null, 'uploads/users'); 
  },
  filename: (req, file, next) => {
    next(null,file.originalname);
  },
  // filename: (req, file, next) => {
  //   next(null, Date.now() + "-" + file.originalname);
  // },
});

const upload = multer({ storage: storage });
module.exports = upload;