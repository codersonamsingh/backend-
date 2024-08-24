const travelMapping = require("../../../../../../Models/Private/Pos/Mapping/travelMapping");

// @desc    Create a new travelMapping
const AddtravelMapping = async (req, res) => {
    try {
        const travelMappingObj = await gettravelMappingObj(req, "create");
        let newtravelMapping = await new travelMapping(travelMappingObj).save();
        res.status(200).json({
            message: "travelMapping Successfully Created",
            variant: "success",
            commId: newtravelMapping._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a travelMapping by ID
const UpdatetravelMapping = async (req, res) => {
    try {
        const travelMappingObj = await gettravelMappingObj(req, "update");
        await updateMe(req, res, travelMappingObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updatetravelMapping) => {
    try {
        const updatedtravelMapping = await travelMapping.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatetravelMapping },
            { new: true }
        );
        if (!updatedtravelMapping) {
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

const gettravelMappingObj = async (req, type) => {
    let newtravelMapping = {};

    if (type === "create") {
        newtravelMapping.createdBy = req.user.id;
        newtravelMapping.partner = req.user.id;
        newtravelMapping.reqNumber = await generateReqNumber();
    }

    // Setting all fields from the request body
    if (req.body.product) newtravelMapping.product = req.body.product;
    if (req.body.insurer) newtravelMapping.insurer = req.body.insurer;
    if (req.body.plan) newtravelMapping.plan = req.body.plan;
    if (req.body.prosperName) newtravelMapping.prosperName = req.body.prosperName;
    if (req.body.prosperDob) newtravelMapping.prosperDob = req.body.prosperDob;
    if (req.body.prosperMobileNumber) newtravelMapping.prosperMobileNumber = req.body.prosperMobileNumber;
    if (req.body.prosperEmail) newtravelMapping.prosperEmail = req.body.prosperEmail;
    if (req.body.applicationNumber) newtravelMapping.applicationNumber = req.body.applicationNumber;
    if (req.body.policyNumber) newtravelMapping.policyNumber = req.body.policyNumber;
    if (req.body.totalPremiumPaid) newtravelMapping.totalPremiumPaid = req.body.totalPremiumPaid;
    if (req.body.sumInsured) newtravelMapping.sumInsured = req.body.sumInsured;
    if (req.body.pincode) newtravelMapping.pincode = req.body.pincode;
    if (req.body.city) newtravelMapping.city = req.body.city;

    // Optional fields
    if (req.body.policyDocument) newtravelMapping.policyDocument = req.body.policyDocument;
    if (req.body.paymentProof) newtravelMapping.paymentProof = req.body.paymentProof;

    // Always update the updatedDate
    newtravelMapping.updatedDate = new Date();

    return newtravelMapping;
};

// Generate request number
const generateReqNumber = async () => {
    let date = new Date();
    let reqNumber = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
    return reqNumber;
};

module.exports = { AddtravelMapping, UpdatetravelMapping };
