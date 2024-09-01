const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for BusinessInsuranceMapping
const BusinessInsuranceMappingSchema = new Schema({
    reqNumber: {
        type: String,
        required: true,
        maxlength: 50
    },
    product: {
        type: String,
        required: true,
enum:["sip","credit","debit"]
    },
    insurer: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
  
    policyNumber: {
        type: String,
    },
    totalPremiumPaid: {
        type: String,
        required: true,
    },
    sumInsured: {
        type: String,
        required: true,
    },
    // Uploads Documents
    policyDocument: {
        type: String,
    },
    paymentProof: {
        type: String,
    },
    businessRegistrationDocument: {
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
  
});

// Export the model
module.exports = mongoose.model("myBusinessInsuranceMapping", BusinessInsuranceMappingSchema);