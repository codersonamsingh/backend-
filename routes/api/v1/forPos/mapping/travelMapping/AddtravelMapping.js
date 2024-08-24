const TravelMapping = require("../../../../../../Models/Private/Pos/Mapping/TravelMapping");

// @desc    Create a new TravelMapping
const AddTravelMapping = async (req, res) => {
    try {
        const travelMappingObj = await getTravelMappingObj(req, "create");
        let newTravelMapping = await new TravelMapping(travelMappingObj).save();
        res.status(200).json({
            message: "TravelMapping Successfully Created",
            variant: "success",
            commId: newTravelMapping._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a TravelMapping by ID
const UpdateTravelMapping = async (req, res) => {
    try {
        const travelMappingObj = await getTravelMappingObj(req, "update");
        await updateMe(req, res, travelMappingObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updateTravelMapping) => {
    try {
        const updatedTravelMapping = await TravelMapping.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateTravelMapping },
            { new: true }
        );
        if (!updatedTravelMapping) {
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

const getTravelMappingObj = async (req, type) => {
    let newTravelMapping = {};

    if (type === "create") {
        newTravelMapping.createdBy = req.user.id;
        newTravelMapping.partner = req.user.id;
        newTravelMapping.reqNumber = await generateReqNumber();
    }

    // Setting all fields from the request body
    if (req.body.product) newTravelMapping.product = req.body.product;
    if (req.body.insurer) newTravelMapping.insurer = req.body.insurer;
    if (req.body.plan) newTravelMapping.plan = req.body.plan;
    if (req.body.travelerName) newTravelMapping.travelerName = req.body.travelerName;
    if (req.body.travelerDob) newTravelMapping.travelerDob = req.body.travelerDob;
    if (req.body.travelerMobileNumber) newTravelMapping.travelerMobileNumber = req.body.travelerMobileNumber;
    if (req.body.travelerEmail) newTravelMapping.travelerEmail = req.body.travelerEmail;
    if (req.body.applicationNumber) newTravelMapping.applicationNumber = req.body.applicationNumber;
    if (req.body.policyNumber) newTravelMapping.policyNumber = req.body.policyNumber;
    if (req.body.totalPremiumPaid) newTravelMapping.totalPremiumPaid = req.body.totalPremiumPaid;
    if (req.body.sumInsured) newTravelMapping.sumInsured = req.body.sumInsured;
    if (req.body.travelDestination) newTravelMapping.travelDestination = req.body.travelDestination;
    if (req.body.travelStartDate) newTravelMapping.travelStartDate = req.body.travelStartDate;
    if (req.body.travelEndDate) newTravelMapping.travelEndDate = req.body.travelEndDate;

    // Optional fields
    if (req.body.policyDocument) newTravelMapping.policyDocument = req.body.policyDocument;
    if (req.body.paymentProof) newTravelMapping.paymentProof = req.body.paymentProof;

    // Always update the updatedDate
    newTravelMapping.updatedDate = new Date();

    return newTravelMapping;
};

// Generate request number
const generateReqNumber = async () => {
    let date = new Date();
    let reqNumber = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
    return reqNumber;
};

module.exports = { AddTravelMapping, UpdateTravelMapping };
