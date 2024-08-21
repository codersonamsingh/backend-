const Joi = require('joi');
const mongoose = require('mongoose');
const User = mongoose.model('myUser'); // Ensure the model is imported or defined in the same file

// Joi Schema for User validation
const userSchema = Joi.object({
    employeeId: Joi.string().max(50).required(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    middleName: Joi.string().max(50),
    dateOfBirth: Joi.date().required(),
    gender: Joi.object({
        label: Joi.string().required(),
        id: Joi.string().required()
    }).required(),
    email: Joi.string().email().max(100).required(),
    mobileNumber: Joi.string().max(15).required(),
    address: Joi.string().max(255),
    city: Joi.string().max(50),
    state: Joi.string().max(50),
    postalCode: Joi.string().max(10),
    country: Joi.string().max(50),
    dateOfJoining: Joi.date(),
    designation: Joi.object({
        label: Joi.string().required(),
        id: Joi.string().required()
    }).required(),
    vertical: Joi.object({
        label: Joi.string().required(),
        id: Joi.string().required()
    }).required(),
    supervisorId: Joi.string().hex(), // ObjectId validation
    salary: Joi.number().precision(2),
    variable: Joi.number().precision(2),
    employmentType: Joi.object({
        label: Joi.string().required(),
        id: Joi.string().required()
    }).required(),
    status: Joi.object({
        label: Joi.string().required(),
        id: Joi.string().required()
    }).required(),
    role: Joi.string().hex(), // ObjectId validation
    notes: Joi.string(),
    password: Joi.string().required(),
    hrRemarks: Joi.string(),
    createdDate: Joi.date(),
    updatedDate: Joi.date()
});

// Middleware to validate and check uniqueness for the user account creation
const validateOnAccountCreate = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message, variant: "error" });
    }

    // Check for unique fields like employeeId, email, mobileNumber
    const { employeeId, email, mobileNumber } = req.body;
    try {
        const userByEmployeeId = await User.findOne({ employeeId });
        if (userByEmployeeId) {
            return res.status(400).json({ message: "Employee ID already exists.", variant: "error" });
        }

        const userByEmail = await User.findOne({ email });
        if (userByEmail) {
            return res.status(400).json({ message: "Email already exists.", variant: "error" });
        }

        const userByMobileNumber = await User.findOne({ mobileNumber });
        if (userByMobileNumber) {
            return res.status(400).json({ message: "Mobile number already exists.", variant: "error" });
        }

        next();
    } catch (dbError) {
        return res.status(500).json({ message: "Database error during uniqueness check.", variant: "error" });
    }
};


// Middleware to validate on updates, optional fields are checked only if they exist
const validateOnAccountUpdate = async (req, res, next) => {
    const { employeeId, email, mobileNumber } = req.body;
    try {
        const userByEmployeeId = await User.findOne({ employeeId });
        if (userByEmployeeId && userByEmployeeId.employeeId.toString() !== employeeId) {
            return res.status(400).json({ message: "Employee ID already exists.", variant: "error" });
        }

        const userByEmail = await User.findOne({ email });
        if (userByEmail && userByEmail.email.toString() !== req.body.email) {
            return res.status(400).json({ message: "Email already exists.", variant: "error" });
        }

        const userByMobileNumber = await User.findOne({ mobileNumber });
        if (userByMobileNumber && userByMobileNumber.mobileNumber.toString() !== req.body.mobileNumber) {
            return res.status(400).json({ message: "Mobile number already exists.", variant: "error" });
        }

        // cannot update own email or mobilenumber
        if (userByEmail._id == req.user.id && userByEmail.email.toString() !== req.body.email) {
            return res.status(400).json({ message: "Can't update your own email", variant: "error" });
        }
        if (userByMobileNumber._id == req.user.id && userByMobileNumber.mobileNumber.toString() !== req.body.mobileNumber) {
            return res.status(400).json({ message: "Can't update your own mobile Number", variant: "error" });
        }

        next();
    } catch (dbError) {
        return res.status(500).json({ message: "Database error during uniqueness check.", variant: "error" });
    }
};

// Middleware to validate employee ID on account deletion
const validateOnAccountDelete = async (req, res, next) => {
    const { error } = Joi.object({
        employeeId: Joi.string().length(24).hex().required()
    }).validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Invalid Employee ID", variant: "error" });
    }
    next();
};

module.exports = { validateOnAccountCreate, validateOnAccountUpdate, validateOnAccountDelete };
