const Joi = require('joi');
const mongoose = require('mongoose');
const HealthMapping = require('../../../../Models/Private/Pos/Mapping/HealthMapping');

const healthMappingSchema = Joi.object({
    reqNumber: Joi.string().max(50).required(),
    product: Joi.string().required(),
    insurer: Joi.string().required(),
    plan: Joi.string().required(),
    prosperName: Joi.string().required(),
    prosperDob: Joi.date().required(),
    prosperMobileNumber: Joi.string().required(),
    prosperEmail: Joi.string().email().required(),
    applicationNumber: Joi.string().required(),
    policyNumber: Joi.string().optional(),
    totalPremiumPaid: Joi.string().required(),
    sumInsured: Joi.string().required(),
    pincode: Joi.string().required(),
    city: Joi.string().required(),
    policyDocument: Joi.string().optional(),
    paymentProof: Joi.string().optional(),
    createdBy: Joi.string().optional(), // This will typically be set server-side
    partner: Joi.string().optional(), // This will typically be set server-side
    createdDate: Joi.date().optional(),
    updatedDate: Joi.date().optional(),
    status: Joi.string().valid("Pending", "Approved", "Rejected").optional(),
    paymentStatus: Joi.string().valid("N/A", "Paid", "Unpaid").optional(),
    remarks: Joi.string().optional(), // Additional field if needed
});

const validateOnHealthMappingCreate = async (req, res, next) => {
    try {
        await healthMappingSchema.validateAsync(req.body, { abortEarly: false });
        
        // Check for duplicate policyNumber (if necessary)
        const duplicate = await HealthMapping.findOne({ policyNumber: req.body.policyNumber });
        if (duplicate) {
            return res.status(400).json({ message: "Duplicate policy number found", variant: "error" });
        }
        
        next();
    } catch (error) {
        // Error handling
        if (error.isJoi) {
            return res.status(400).json({ message: error.details.map(err => err.message).join(', '), variant: "error" });
        } else {
            return res.status(500).json({ message: error.message || "Internal server error", variant: "error" });
        }
    }
};

const validateOnHealthMappingUpdate = async (req, res, next) => {
    try {
        await healthMappingSchema.validateAsync(req.body, { abortEarly: false });
        
        // Check for duplicate policyNumber, excluding current healthMapping ID
        const duplicate = await HealthMapping.findOne({
            policyNumber: req.body.policyNumber,
            _id: { $ne: req.params.id },
        });
        if (duplicate) {
            return res.status(400).json({ message: "Duplicate policy number found", variant: "error" });
        }
        
        next();
    } catch (error) {
        // Error handling
        if (error.isJoi) {
            return res.status(400).json({ message: error.details.map(err => err.message).join(', '), variant: "error" });
        } else {
            return res.status(500).json({ message: error.message || "Internal server error", variant: "error" });
        }
    }
};

const validateOnHealthMappingDelete = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid healthMapping ID.", variant: "error" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error during healthMapping deletion validation.", variant: "error" });
    }
};

module.exports = { validateOnHealthMappingCreate, validateOnHealthMappingUpdate, validateOnHealthMappingDelete };
