const Joi = require('joi');
const mongoose = require('mongoose');
const Booking = require('../../../Models/Private/Employee/Booking');

const nestedLabelIdSchema = Joi.object({
    label: Joi.string().required(),
    id: Joi.string().required()
});

const bookingSchema = Joi.object({
    businessType: nestedLabelIdSchema.required(),
    businessName: Joi.string().required(),
    pospCode: Joi.string().required(),
    bpCode: Joi.string().required(),
    rmName: Joi.string().required(),
    rmCode: Joi.string().required(),
    function: nestedLabelIdSchema.required(),
    functionHead: nestedLabelIdSchema.required(),
    bookingDate: Joi.date().required(),
    bookingMonth: Joi.date().required(),
    customerName: Joi.string().required(),
    customerEmailId: Joi.string().email().required(),
    customerMobileNo: Joi.number().integer().required(),
    insuranceCompanyName: nestedLabelIdSchema.required(),
    insuranceBrokerId: nestedLabelIdSchema.required(),
    productCategory: nestedLabelIdSchema.required(),
    product: nestedLabelIdSchema.required(),
    productType: nestedLabelIdSchema.required(),
    policyNumber: Joi.string().required(),
    planType: nestedLabelIdSchema.required(),
    premium: Joi.number().required(),
    netPremium: Joi.number().required(),
    odPremium: Joi.number().required(),
    commissionablePremium: Joi.number().required(),
    registrationNumber: Joi.string().required(),
    rto: Joi.string().required(),
    state: Joi.string().required(),
    fuelType: nestedLabelIdSchema.required(),
    cubicCapacity: Joi.string().required(),
    cpa: Joi.string().required(),
    ncb: Joi.string().required(),
    loadingCapacity: nestedLabelIdSchema.required(),
    carrier: nestedLabelIdSchema.required(),
    seatingCapacityIncludingDriver: nestedLabelIdSchema.required(),
    vehicleRegistrationYear: Joi.date().required(),
    make: Joi.string().required(),
    model: Joi.string().required(),
    policyStartDate: Joi.date().required(),
    policyEndDate: Joi.date().required(),
    verificationBy: nestedLabelIdSchema.required(),
    verificationDate: Joi.date().required(),
    remarks: Joi.string().required(),
    payoutToBePaidOn: nestedLabelIdSchema.required(),
    payoutPercent: Joi.string().required(),
    tds5PercentOnAmt: Joi.string().required(),
    amount: Joi.number().required(),
    payinToBePaidOn: nestedLabelIdSchema.required(),
    payinPercent: Joi.string().required(),
    tds10Percent: Joi.string().required(),
    netIncomeInBankAccount: Joi.number().required(),
    retentionPercent: Joi.string().required(),
    amountReceivedFromInsurer: Joi.number().required(),
    finalAgentPayoutToBePaid: Joi.number().required(),
    netRevenue: Joi.number().required(),
    paidUnpaid: nestedLabelIdSchema.required(),
    paidToAgentCode: Joi.string().required(),
    outstanding: Joi.number().required(),
    invoiceRaised: nestedLabelIdSchema.required(),
    dispute: nestedLabelIdSchema.required(),
   
});

const validateOnBookingCreate = async (req, res, next) => {
    try {
        await bookingSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate policyNumber
        const duplicate = await Booking.findOne({ policyNumber: req.body.policyNumber });
        if (duplicate && duplicate._id.toString() !== req.params.id) {
            return res.status(400).json({ message: "Duplicate policy number found.", variant: "error" });
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

const validateOnBookingUpdate = async (req, res, next) => {
    try {
        await bookingSchema.validateAsync(req.body, { abortEarly: false });
        // Check for duplicate policyNumber, excluding current booking ID
        const duplicate = await Booking.findOne({
            policyNumber: req.body.policyNumber,
            _id: { $ne: req.params.id }
        });

        if (duplicate) {
            return res.status(400).json({ message: "Duplicate policy number found for another booking.", variant: "error" });
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

const validateOnBookingDelete = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid booking ID.", variant: "error" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error during booking deletion validation.", variant: "error" });
    }
};

module.exports = { validateOnBookingCreate, validateOnBookingUpdate, validateOnBookingDelete };
