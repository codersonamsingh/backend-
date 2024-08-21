const Joi = require('joi');
const mongoose = require('mongoose');
const OfflineHealthQuote = require('../../../Models/Private/Pos/OfflineHealthQuote');

const offlineHealthQuoteSchema = Joi.object({
    reqNumber: Joi.string().optional(),
    fullName: Joi.string().optional(),
    memberInsured: Joi.string().optional().valid("Self", "Floater"),
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
    status: Joi.string().valid("Pending", "Approved", "Rejected").optional(),
    paymentStatus: Joi.string().optional(),
    createdBy: Joi.string().optional(),
    partner: Joi.string().optional()
});

const validateOnOfflineHealthQuoteCreate = async (req, res, next) => {
    try {
        await offlineHealthQuoteSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate reqNumber
        const duplicate = await OfflineHealthQuote.findOne({ reqNumber: req.body.reqNumber });
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

const validateOnOfflineHealthQuoteUpdate = async (req, res, next) => {
    try {
        await offlineHealthQuoteSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate reqNumber, excluding current offlineHealthQuote ID
        const duplicate = await OfflineHealthQuote.findOne({
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

const validateOnOfflineHealthQuoteDelete = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid offlineHealthQuote ID.", variant: "error" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error during offlineHealthQuote deletion validation.", variant: "error" });
    }
};

module.exports = { validateOnOfflineHealthQuoteCreate, validateOnOfflineHealthQuoteUpdate, validateOnOfflineHealthQuoteDelete };
