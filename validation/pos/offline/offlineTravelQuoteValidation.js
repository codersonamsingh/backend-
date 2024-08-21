const Joi = require('joi');
const mongoose = require('mongoose');
const OfflineTravelQuote = require('../../../Models/Private/Pos/OfflineTravelQuote');

const offlineTravelQuoteSchema = Joi.object({
    reqNumber: Joi.string().optional(),
    memberInsured: Joi.string().optional().valid("Self", "Floater"),
    fullName: Joi.string().optional(),
    dob: Joi.date().optional(),
    city: Joi.string().optional(),
    pinCode: Joi.string().optional(),
    mobileNumber: Joi.string().optional(),
    medicalHistory: Joi.string().valid(
        "Diabetes",
        "Blood Pressure",
        "Any Surgery",
        "Thyroid",
        "Asthma",
        "Any other Disease",
        "None of these"
    ).optional(),
    sumInsured: Joi.string().optional(),
    journeyStartDate: Joi.date().optional(),
    journeyEndDate: Joi.date().optional(),
    DurationToBeInsured: Joi.string().optional(),
    status: Joi.string().valid("Pending", "Approved", "Rejected").optional(),
    paymentStatus: Joi.string().optional(),
    createdBy: Joi.string().optional(),
    partner: Joi.string().optional()
});

const validateOnOfflineTravelQuoteCreate = async (req, res, next) => {
    try {
        await offlineTravelQuoteSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate reqNumber
        const duplicate = await OfflineTravelQuote.findOne({ reqNumber: req.body.reqNumber });
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

const validateOnOfflineTravelQuoteUpdate = async (req, res, next) => {
    try {
        await offlineTravelQuoteSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate reqNumber, excluding current offlineTravelQuote ID
        const duplicate = await OfflineTravelQuote.findOne({
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

const validateOnOfflineTravelQuoteDelete = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid offlineTravelQuote ID.", variant: "error" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error during offlineTravelQuote deletion validation.", variant: "error" });
    }
};

module.exports = { validateOnOfflineTravelQuoteCreate, validateOnOfflineTravelQuoteUpdate, validateOnOfflineTravelQuoteDelete };
