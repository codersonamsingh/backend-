const Joi = require('joi');
const mongoose = require('mongoose');
const TravelMapping = require('../../../../Models/Private/Pos/Mapping/TravelMapping');


const travelMappingSchema = Joi.object({
    reqNumber: Joi.optional(),
    issueType: Joi.string().optional(),
    productName: Joi.optional(),
    isBus: Joi.optional(),
    isSchoolBus: Joi.string().optional().valid("School Bus", "Staff Bus"),
    customerName: Joi.string().optional(),
    registrationNumber: Joi.string().optional(),
    insurerName: Joi.string().optional(),
    policyNumber: Joi.string().optional(),
    premium: Joi.string().optional(),
    remarks: Joi.string().optional(),
    policyDocument: Joi.string().optional(),
    uploadRc: Joi.string().optional(),
    uploadPermit: Joi.string().optional(),
    createdBy: Joi.string().optional(),
    partner: Joi.string().optional(),
    createdDate: Joi.date().optional(),
    travelEndDate: Joi.date().optional(),
    travelStartDate: Joi.date().optional(),
    travelDestination: Joi.optional(),
    sumInsured: Joi.date().optional(),
    totalPremiumPaid: Joi.date().optional(),
    applicationNumber: Joi.optional(),
    travelerEmail: Joi.optional(),
    travelerMobileNumber: Joi.optional(),
    travelerDob: Joi.optional(),
    travelerName: Joi.optional(),
    plan: Joi.optional(),
    insurer: Joi.optional(),
    product: Joi.optional(),
   
    updatedDate: Joi.optional(),
    status: Joi.string().optional().valid("Pending", "Approved", "Rejected"),
    paymentStatus: Joi.string().optional().valid("N/A", "Pending", "Completed")
});

const validateOnTravelMappingCreate = async (req, res, next) => {
    try {
        await travelMappingSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate reqNumber
        const duplicate = await TravelMapping.findOne({ reqNumber: req.body.reqNumber });
        if (duplicate) {
            return res.status(400).json({ message: "Duplicate reqNumber found", variant: "error" });
        }
        next();
    } catch (error) {
        // Improved error handling
        if (error.isJoi) { // Check if the error is from Joi
            return res.status(400).json({ message: error.details.map(err => err.message).join(', '), variant: "error" });
        } else {
            // Handle other types of errors, e.g., database errors
            return res.status(500).json({ message: error.message || "Internal server error", variant: "error" });
        }
    }
};

const validateOnTravelMappingUpdate = async (req, res, next) => {
    try {
        await travelMappingSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate reqNumber, excluding current travelMapping ID
        const duplicate = await TravelMapping.findOne({
            reqNumber: req.body.reqNumber,
            _id: { $ne: req.params.id }
        });
        if (duplicate) {
            return res.status(400).json({ message: "Duplicate reqNumber found", variant: "error" });
        }

        next();
    } catch (error) {
        // Improved error handling
        if (error.isJoi) {
            return res.status(400).json({ message: error.details.map(err => err.message).join(', '), variant: "error" });
        } else {
            return res.status(500).json({ message: error.message || "Internal server error", variant: "error" });
        }
    }
};

const validateOnTravelMappingDelete = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid travelMapping ID.", variant: "error" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error during travelMapping deletion validation.", variant: "error" });
    }
};

module.exports = { validateOnTravelMappingCreate, validateOnTravelMappingUpdate, validateOnTravelMappingDelete };
