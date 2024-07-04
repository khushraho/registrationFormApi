
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/userModel.js");
const customError=require("../utills/CustomError.js")
module.exports = {

  registerUser: catchAsyncErrors(async (req, res,next) => {

    const formData = req.body;
    const isRegistered = await User.findOne({
      email:formData.email
    });
    // console.log(isRegistered,"......");
  
  if (isRegistered) {
    return next(new customError("User already Registered with This Email!", 400));
  }

    const today = new Date();
    const dobDate = new Date(formData.dob);
    const ageDiff = today.getFullYear() - dobDate.getFullYear();
    const isOver18 = ageDiff > 18 || (ageDiff === 18 && today.getMonth() >= dobDate.getMonth() && today.getDate() >= dobDate.getDate());

    if (!isOver18) {
      return next(new customError("Date of birth must be at least 18 years ago!", 400));
    }
    const files = req.files.map(file => ({
      name: file.originalname,
      type: file.mimetype,
      file: file.path
    }));

    // Save the form data to MongoDB
    const newForm = await User.create({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      dob: formData.dob,
      residentialAddress1: formData.residentialAddress1,
      residentialAddress2: formData.residentialAddress2,
      sameAsResidential: formData.sameAsResidential,
      permanentAddress1: formData.permanentAddress1,
      permanentAddress2: formData.permanentAddress2,
      files: files
    });
    res.status(200).json({
      success: true,
       message: 'Form submitted successfully',
       data: newForm,
    });
  }),
};
