const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for MotorMapping
const MotorMappingSchema = new Schema({
    reqNumber: {
        type: String,
        required: true,
        maxlength: 50
      },
  
  issueType:{
     type: String,
    },
  productName:{
     type: String,
    },
    // optional for bus
    isBus:{
        type: String,
        enum:["Yes","No"]
    },
    isSchoolBus:{
        type: String,
        enum:["School Bus","Staff Bus"]
    },
  customerName:{
     type: String,
    },
    registrationNumber:{
        type: String,
      },
      insurerName:{
        type: String,
      },
    // for co
    policyNumber:{
        type: String,
      },
      premium:{
        type: String,
      },
      remarks:{
        type: String,
      },

      // File Uploads
      policyDocument: {
        type: String,
      },
      uploadRc: {
        type: String,
      },
      uploadPermit: {
        type: String,
      },
      // Default fields
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      partner: {
        type: Schema.Types.ObjectId,
        ref: "myPosUser"
      },
      createdDate: {
        type: Date,
        default: Date.now,
      },
      updatedDate: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        default: "Pending",
      },
      paymentStatus: {
        type: String,
        default: "N/A",
      },
});

// Export the model
module.exports = mongoose.model("myMotorMapping", MotorMappingSchema);
