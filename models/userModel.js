const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    validate: validator.isEmail,
  }, 
  dob: { type: Date, required: true },
  residentialAddress1: { type: String ,required:true},
  residentialAddress2: { type: String,required:true },
  sameAsResidential: { type: Boolean },
  permanentAddress1: { type: String },
  permanentAddress2: { type: String },
  files: [{
    name: { type: String ,required:true},
    type: { type: String,required:true },
    file: { type: String,required:true  },
  }]
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
