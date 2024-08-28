const healthMapping = require("../../../../../../Models/Private/Pos/Mapping/HealthMapping");

// @desc    Create a new healthMapping
const AddhealthMapping = async (req, res) => {
    try {
        const healthMappingObj = await gethealthMappingObj(req, "create");
        let newhealthMapping = await new healthMapping(healthMappingObj).save();
        res.status(200).json({
            message: "healthMapping Successfully Created",
            variant: "success",
            commId: newhealthMapping._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a healthMapping by ID
const UpdatehealthMapping = async (req, res) => {
    try {
        const healthMappingObj = await gethealthMappingObj(req, "update");
        await updateMe(req, res, healthMappingObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updatehealthMapping) => {
    try {
        const updatedhealthMapping = await healthMapping.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatehealthMapping },
            { new: true }
        );
        if (!updatedhealthMapping) {
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

const gethealthMappingObj = async (req, type) => {
    let newhealthMapping = {};

    if (type === "create") {
        newhealthMapping.createdBy = req.user.id;
        newhealthMapping.partner = req.user.id;
        newhealthMapping.reqNumber = await generateReqNumber();
    }

    // Setting all fields from the request body
    if (req.body.product) newhealthMapping.product = req.body.product;
    if (req.body.insurer) newhealthMapping.insurer = req.body.insurer;
    if (req.body.plan) newhealthMapping.plan = req.body.plan;
    if (req.body.prosperName) newhealthMapping.prosperName = req.body.prosperName;
    if (req.body.prosperDob) newhealthMapping.prosperDob = req.body.prosperDob;
    if (req.body.prosperMobileNumber) newhealthMapping.prosperMobileNumber = req.body.prosperMobileNumber;
    if (req.body.prosperEmail) newhealthMapping.prosperEmail = req.body.prosperEmail;
    if (req.body.applicationNumber) newhealthMapping.applicationNumber = req.body.applicationNumber;
    if (req.body.policyNumber) newhealthMapping.policyNumber = req.body.policyNumber;
    if (req.body.totalPremiumPaid) newhealthMapping.totalPremiumPaid = req.body.totalPremiumPaid;
    if (req.body.sumInsured) newhealthMapping.sumInsured = req.body.sumInsured;
    if (req.body.pincode) newhealthMapping.pincode = req.body.pincode;
    if (req.body.city) newhealthMapping.city = req.body.city;

    // Optional fields
    if (req.body.policyDocument) newhealthMapping.policyDocument = req.body.policyDocument;
    if (req.body.paymentProof) newhealthMapping.paymentProof = req.body.paymentProof;

    // Always update the updatedDate
    newhealthMapping.updatedDate = new Date();

    return newhealthMapping;
};

// Generate request number
const generateReqNumber = async () => {
    let date = new Date();
    let reqNumber = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
    return reqNumber;
};

module.exports = { AddhealthMapping, UpdatehealthMapping };
