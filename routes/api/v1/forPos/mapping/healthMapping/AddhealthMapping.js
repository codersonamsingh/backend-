const HealthMapping = require("../../../../../../Models/Private/Pos/Mapping/HealthMapping");

// @desc    Create a new HealthMapping
const AddHealthMapping = async (req, res) => {
    try {
        const healthMappingObj = await getHealthMappingObj(req, "create");
        let newHealthMapping = await new HealthMapping(healthMappingObj).save();
        res.status(200).json({
            message: "HealthMapping Successfully Created",
            variant: "success",
            commId: newHealthMapping._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a HealthMapping by ID
const UpdateHealthMapping = async (req, res) => {
    try {
        const healthMappingObj = await getHealthMappingObj(req, "update");
        await updateMe(req, res, healthMappingObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updateHealthMapping) => {
    try {
        const updatedHealthMapping = await HealthMapping.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateHealthMapping },
            { new: true }
        );
        if (!updatedHealthMapping) {
            return res.status(406).json({
                message: "ID not found",
                variant: "error",
            });
        }
        res.status(200).json({
            message: "Updated successfully!",
            variant: "success",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error: " + error.message,
        });
    }
};

const getHealthMappingObj = async (req, type) => {
    let newHealthMapping = {};

    if (type === "create") {
        newHealthMapping.createdBy = req.user.id;
        newHealthMapping.partner = req.user.id;
        newHealthMapping.reqNumber = await generateReqNumber();
    }

    // Setting all fields from the request body
    if (req.body.product) newHealthMapping.product = req.body.product;
    if (req.body.insurer) newHealthMapping.insurer = req.body.insurer;
    if (req.body.plan) newHealthMapping.plan = req.body.plan;
    if (req.body.prosperName) newHealthMapping.prosperName = req.body.prosperName;
    if (req.body.prosperDob) newHealthMapping.prosperDob = req.body.prosperDob;
    if (req.body.prosperMobileNumber) newHealthMapping.prosperMobileNumber = req.body.prosperMobileNumber;
    if (req.body.prosperEmail) newHealthMapping.prosperEmail = req.body.prosperEmail;
    if (req.body.applicationNumber) newHealthMapping.applicationNumber = req.body.applicationNumber;
    if (req.body.policyNumber) newHealthMapping.policyNumber = req.body.policyNumber;
    if (req.body.totalPremiumPaid) newHealthMapping.totalPremiumPaid = req.body.totalPremiumPaid;
    if (req.body.sumInsured) newHealthMapping.sumInsured = req.body.sumInsured;
    if (req.body.pincode) newHealthMapping.pincode = req.body.pincode;
    if (req.body.city) newHealthMapping.city = req.body.city;

    // Optional fields
    if (req.body.policyDocument) newHealthMapping.policyDocument = req.body.policyDocument;
    if (req.body.paymentProof) newHealthMapping.paymentProof = req.body.paymentProof;

    // Always update the updatedDate
    newHealthMapping.updatedDate = new Date();

    return newHealthMapping;
};

// Generate request number
const generateReqNumber = async () => {
    let date = new Date();
    let reqNumber = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
    return reqNumber;
};

module.exports = { AddHealthMapping, UpdateHealthMapping };
