const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for TravelMapping
const TravelMappingSchema = new Schema({
    reqNumber: {
        type: String,
        required: true,
        maxlength: 50
      },
      product: {
          type: String,
          required: true,
      },
    insurer: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        required: true,
    },
    travelerName: {
        type: String,
        required: true,
    },
    travelerDob: {
        type: Date,
        required: true,
    },
    travelerMobileNumber: {
        type: String,
        required: true,
    },
    travelerEmail: {
        type: String,
        required: true,
    },
    applicationNumber: {
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
    travelDestination: {
        type: String,
        required: true,
    },
    travelStartDate: {
        type: Date,
        required: true,
    },
    travelEndDate: {
        type: Date,
        required: true,
    },
    // Uploads Documents
    policyDocument: {
        type: String,
    },
    paymentProof: {
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
module.exports = mongoose.model("myTravelMapping", TravelMappingSchema);