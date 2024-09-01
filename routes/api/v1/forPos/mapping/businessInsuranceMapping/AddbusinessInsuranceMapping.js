const BusinessInsuranceMapping = require("../../../../../../Models/Private/Pos/Mapping/BusinessInsuranceMapping");

// @desc    Create a new BusinessInsuranceMapping
const AddBusinessInsuranceMapping = async (req, res) => {
    try {
        const businessInsuranceMappingObj = await getBusinessInsuranceMappingObj(req, "create");
        let newBusinessInsuranceMapping = await new BusinessInsuranceMapping(businessInsuranceMappingObj).save();
        res.status(200).json({
            message: "BusinessInsuranceMapping Successfully Created",
            variant: "success",
            commId: newBusinessInsuranceMapping._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a BusinessInsuranceMapping by ID
const UpdateBusinessInsuranceMapping = async (req, res) => {
    try {
        const businessInsuranceMappingObj = await getBusinessInsuranceMappingObj(req, "update");
        await updateMe(req, res, businessInsuranceMappingObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updateBusinessInsuranceMapping) => {
    try {
        const updatedBusinessInsuranceMapping = await BusinessInsuranceMapping.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateBusinessInsuranceMapping },
            { new: true }
        );
        if (!updatedBusinessInsuranceMapping) {
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

const getBusinessInsuranceMappingObj = async (req, type) => {
    let newBusinessInsuranceMapping = {};

    if (type === "create") {
        newBusinessInsuranceMapping.createdBy = req.user.id;
        newBusinessInsuranceMapping.partner = req.user.id;
        newBusinessInsuranceMapping.reqNumber = await generateReqNumber();
    }

    // Setting all fields from the request body
    if (req.body.reqNumber) newBusinessInsuranceMapping.reqNumber = req.body.reqNumber;
    if (req.body.product) newBusinessInsuranceMapping.product = req.body.product;
    if (req.body.insurer) newBusinessInsuranceMapping.insurer = req.body.insurer;
    if (req.body.plan) newBusinessInsuranceMapping.plan = req.body.plan;
    if (req.body.businessName) newBusinessInsuranceMapping.businessName = req.body.businessName;
    if (req.body.businessType) newBusinessInsuranceMapping.businessType = req.body.businessType;
    if (req.body.policyNumber) newBusinessInsuranceMapping.policyNumber = req.body.policyNumber;
    if (req.body.totalPremiumPaid) newBusinessInsuranceMapping.totalPremiumPaid = req.body.totalPremiumPaid;
    if (req.body.sumInsured) newBusinessInsuranceMapping.sumInsured = req.body.sumInsured;

    // Optional fields
    if (req.body.policyDocument) newBusinessInsuranceMapping.policyDocument = req.body.policyDocument;
    if (req.body.paymentProof) newBusinessInsuranceMapping.paymentProof = req.body.paymentProof;
    if (req.body.businessRegistrationDocument) newBusinessInsuranceMapping.businessRegistrationDocument = req.body.businessRegistrationDocument;

    // Always update the updatedDate
    newBusinessInsuranceMapping.updatedDate = new Date();

    return newBusinessInsuranceMapping;
};

// Generate request number
const generateReqNumber = async () => {
    let date = new Date();
    let reqNumber = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
    return reqNumber;
};

module.exports = { AddBusinessInsuranceMapping, UpdateBusinessInsuranceMapping };
