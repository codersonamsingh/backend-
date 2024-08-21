const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for OfflineMotorQuote
const OfflineMotorQuoteSchema = new Schema({
  reqNumber: {
    type: String,
    required: true,
    maxlength: 50
},
memberInsured: {
  type: String,
  enum:["Self","Floater"]
},
  vehicleVersion: { 
    type: String, 
    required: true,
    enum: ["old", "new"] 
  },
  registrationDate: {
    type: Date,
  },
  registrationNumber: {
    type: String,
  },
  vehicleType: { 
    type: String, 
    required: true,
    enum: ["Private Car", "Commercial Vehicle", "Three Wheeler", "School Bus", "PCV", "Tractor", "Misc D"] 
  },
  rtoNumber: {
    type: String,
  },
  policyType: { 
    type: String, 
    required: true,
    enum: ["Comprehensive", "TP only"] 
  },
  haveOldPolicyDetail: {
    type: String,
    required: true,
    enum: ["Yes", "No"] 
  },
  expiryDate: {
    type: Date,
  },
  claimStatus: {
    type: String,
    required: true,
    enum: ["Yes", "No"] 
  },
  previousInsurer: {
    type: String,
  },
  lastYearNCB: {
    type: String,
  },
  insurers: {
    type: String,
    required: true,
  },
  addOns: {
    type: String,
    required: true,
  },
  idvValue: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  panNumber: {
    type: String,
  },
  // File Uploads
  rc: [{
    type: String,
  }],
  previousYearPolicy: [{
    type: String,
  }],
  invoice: [{
    type: String,
  }],
  panOrForm60: [{
    type: String,
  }],
  voterDrivingPassportGst: [{
    type: String,
  }],
  quoteFromOther: [{
    type: String,
  }],
  paymentDoneSc: [{
    type: String,
  }],
  policyCopySection: [{
    type: String,
  }],
  other: [{
    type: String,
  }],
  remarks: {
    type: String,
  },
  // Default fields
  createdBy: {
    type: Schema.Types.ObjectId,
  },
  partner: {
    type: Schema.Types.ObjectId,
    ref: "myPosUser",
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
module.exports = mongoose.model("myOfflineMotorQuote", OfflineMotorQuoteSchema);
