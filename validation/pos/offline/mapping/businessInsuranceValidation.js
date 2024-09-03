const Joi = require('joi');
const mongoose = require('mongoose');
const BusinessInsuranceMapping = require('../../../../Models/Private/Pos/Mapping/BusinessInsuranceMapping');


const businessInsuranceMappingSchema = Joi.object({
    reqNumber: Joi.string().optional(),
    product: Joi.string().optional().valid("sip", "credit", "debit"),
    insurer: Joi.string().optional(),
    plan: Joi.string().optional(),
    businessName: Joi.string().optional(),
    businessType: Joi.string().optional(),
    policyNumber: Joi.string().optional(),
    totalPremiumPaid: Joi.string().optional(),
    sumInsured: Joi.string().optional(),
    policyDocument: Joi.string().optional(),  // Corrected the typo from policyDocumen to policyDocument
    paymentProof: Joi.string().optional(),
    businessRegistrationDocument: Joi.string().optional(),
    createdBy: Joi.string().optional(),
    partner: Joi.string().optional(),
    createdDate: Joi.date().optional(),
    updatedDate: Joi.date().optional(),
});

const validateOnBusinessInsuranceMappingCreate = async (req, res, next) => {
    try {
        await businessInsuranceMappingSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate reqNumber
        const duplicate = await BusinessInsuranceMapping.findOne({ reqNumber: req.body.reqNumber });
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

const validateOnBusinessInsuranceMappingUpdate = async (req, res, next) => {
    try {
        await businessInsuranceMappingSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate reqNumber, excluding current businessInsuranceMapping ID
        const duplicate = await BusinessInsuranceMapping.findOne({
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

const validateOnBusinessInsuranceMappingDelete = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid businessInsuranceMapping ID.", variant: "error" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error during businessInsuranceMapping deletion validation.", variant: "error" });
    }
};
module.exports = { validateOnBusinessInsuranceMappingCreate, validateOnBusinessInsuranceMappingUpdate, validateOnBusinessInsuranceMappingDelete };
