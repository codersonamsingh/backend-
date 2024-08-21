const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for OfflineHealthQuote
const OfflineHealthQuoteSchema = new Schema({
    reqNumber: {
        type: String,
        required: true,
        maxlength: 50
      },
      memberInsured: {
        type: String,
        enum:["Self","Floater"]
      },
      fullName: {
        type: String,
      },
      dob: {
        type: Date,
      },
      city: {
        type: String,
      },
      pinCode: {
        type: String,
      },
      mobileNumber: {
        type: String,
      },
      medicalHistory: {
        type: String,
        enum: [
          "Diabetes",
          "Blood Pressure",
          "Any Surgery",
          "Thyroid",
          "Asthma",
          "Any other Disease",
          "None of these"
        ]
      },
      sumInsured: {
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
module.exports = mongoose.model("myOfflineHealthQuote", OfflineHealthQuoteSchema);
