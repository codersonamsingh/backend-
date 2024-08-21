const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpCreationSchema = new Schema({


   mobileNumber: {
    mobileNumber: {
    type: String,
    default: ""
    },
    otp:{
    type: String,
    default: ""
  },
verified:{
    type: Boolean,
    default: false
},
   },
   email: {
    emailId: {
    type: String,
    default: ""
    },
    otp:{
    type: String,
    default: ""
  },
verified:{
    type: Boolean,
    default: false
},
   },

   place: {
    type: String,
    default: "Login"
   },
 
  // Add more fields as needed
  user: {
    type: Schema.Types.ObjectId,
    ref: "myUser",
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = OtpCreation = mongoose.model("myOtpCreation", OtpCreationSchema);
