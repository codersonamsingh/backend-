const Joi = require('joi');
const mongoose = require('mongoose');
const OfflineMotorQuote = require('../../../Models/Private/Pos/OfflineMotorQuote');

const offlineMotorQuoteSchema = Joi.object({
    vehicleVersion: Joi.string().valid("old", "new").required(),
    registrationDate: Joi.string().optional(),
    registrationNumber: Joi.string().optional(),
    vehicleType: Joi.string().valid("Private Car", "Commercial Vehicle", "Three Wheeler", "School Bus", "PCV", "Tractor", "Misc D").required(),
    rtoNumber: Joi.string().optional(),
    policyType: Joi.string().valid("Comprehensive", "TP only").required(),
    haveOldPolicyDetail: Joi.string().valid("Yes", "No").required(),
    expiryDate: Joi.date().optional(),
    claimStatus: Joi.string().valid("Yes", "No").required(),
    previousInsurer: Joi.string().optional(),
    lastYearNCB: Joi.string().optional(),
    insurers: Joi.string().required(),
    addOns: Joi.string().required(),
    idvValue: Joi.string().required(),
    customerEmail: Joi.string().email().required(),
    mobileNumber: Joi.string().required(),
    dateOfBirth: Joi.date().optional(),
    panNumber: Joi.string().optional(),
    rc: Joi.array().items(Joi.string()).optional(),
    previousYearPolicy: Joi.array().items(Joi.string()).optional(),
    invoice: Joi.array().items(Joi.string()).optional(),
    panOrForm60: Joi.array().items(Joi.string()).optional(),
    voterDrivingPassportGst: Joi.array().items(Joi.string()).optional(),
    quoteFromOther: Joi.array().items(Joi.string()).optional(),
    paymentDoneSc: Joi.array().items(Joi.string()).optional(),
    policyCopySection: Joi.array().items(Joi.string()).optional(),
    other: Joi.array().items(Joi.string()).optional(),
    remarks: Joi.string().optional(),
});

const validateOnOfflineMotorQuoteCreate = async (req, res, next) => {
    try {
        await offlineMotorQuoteSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate policyNumber
        const duplicate = await OfflineMotorQuote.findOne(req.body);
        if (duplicate) {
            return res.status(400).json({ message: "Seems duplicate", variant: "error" });
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

const validateOnOfflineMotorQuoteUpdate = async (req, res, next) => {
    try {
        await offlineMotorQuoteSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate policyNumber, excluding current offlineMotorQuote ID
        const myBody = req.body;
        myBody._id = { $ne: req.params.id };
        const duplicate = await OfflineMotorQuote.findOne(myBody);
        if (duplicate) {
            return res.status(400).json({ message: "Seems duplicate", variant: "error" });
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

const validateOnOfflineMotorQuoteDelete = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid offlineMotorQuote ID.", variant: "error" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error during offlineMotorQuote deletion validation.", variant: "error" });
    }
};

module.exports = { validateOnOfflineMotorQuoteCreate, validateOnOfflineMotorQuoteUpdate, validateOnOfflineMotorQuoteDelete };
