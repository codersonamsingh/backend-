const Joi = require('joi');
const mongoose = require('mongoose');
const Role = require('../../Models/Role');

const fieldSchema = Joi.object({
    _id:Joi.optional(),
    label: Joi.string().required(),
    key: Joi.string().required(),
    enable: Joi.boolean().required()
});

const actionSchema = Joi.object({
    _id:Joi.optional(),
    label: Joi.string().required(),
    key: Joi.string().required(),
    enable: Joi.boolean().required(),
    fieldPermissions: Joi.array().items(fieldSchema)
});

const permissionSchema = Joi.object({
    _id:Joi.optional(),
    label: Joi.string().required(),
    key: Joi.string().required(),
    enable: Joi.boolean().required(),
    actions: Joi.array().items(actionSchema)
});

const roleSchema = Joi.object({
    _id:Joi.optional(),
    roleName: Joi.string().required(),
    description: Joi.string().allow(''),
    permissions: Joi.array().items(permissionSchema)
});

const validateOnRoleCreate = async (req, res, next) => {
    try {
        await roleSchema.validateAsync(req.body, { abortEarly: false });
        
        // Check for duplicate role name
        const duplicate = await Role.findOne({ roleName: req.body.roleName });
        if (duplicate) {
            return res.status(400).json({ message: "Duplicate role name found.", variant: "error" });
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

const validateOnRoleUpdate = async (req, res, next) => {
    try {
        await roleSchema.validateAsync(req.body, { abortEarly: false });
        
        // Check for duplicate role name, excluding current role ID
        const duplicate = await Role.findOne({
            roleName: req.body.roleName,
            _id: { $ne: req.params.id }
        });
        if (duplicate) {
            return res.status(400).json({ message: "Duplicate role name found for another role.", variant: "error" });
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

const validateOnRoleDelete = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid role ID.", variant: "error" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error during role deletion validation.", variant: "error" });
    }
};

module.exports = { validateOnRoleCreate, validateOnRoleUpdate, validateOnRoleDelete };
