const OfflineTravelQuote = require("../../../../../../Models/Private/Pos/OfflineTravelQuote");

// @desc    Create a new offlineTravelQuote
const AddTravelQuote = async (req, res) => {
    try {
        const offlineTravelQuoteObj = await getOfflineTravelQuoteObj(req, "create");
        let newOfflineTravelQuote = await new OfflineTravelQuote(offlineTravelQuoteObj).save();
        res.status(200).json({
            message: "OfflineTravelQuote Successfully Created",
            variant: "success",
            commId: newOfflineTravelQuote._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a offlineTravelQuote by ID
const UpdateOfflineTravelQuote = async (req, res) => {
    try {
        const offlineTravelQuoteObj = await getOfflineTravelQuoteObj(req, "update");
        await updateMe(req, res, offlineTravelQuoteObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updateOfflineTravelQuote) => {
    try {
        const offlineTravelQuote = await OfflineTravelQuote.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateOfflineTravelQuote },
            { new: true }
        );
        if (!offlineTravelQuote) {
            return res.status(406).json({
                message: "Id not found",
                variant: "error",
            });
        }
        res.status(200).json({
            message: "Updated successfully!!",
            variant: "success",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error" + error.message,
        });
    }
};

const getOfflineTravelQuoteObj = async (req, type) => {
    let newOfflineTravelQuote = {};

    if (type === "create") {
        newOfflineTravelQuote.createdBy = req.user.id;
        newOfflineTravelQuote.partner =  req.user.id; // Assuming partnerId is available in req.user
        newOfflineTravelQuote.reqNumber = await generateReqNumber();
        newOfflineTravelQuote.createdDate = new Date();
    }

    if (req.body.reqNumber) {
        newOfflineTravelQuote.reqNumber = req.body.reqNumber;
    }
    if (req.body.memberInsured) {
        newOfflineTravelQuote.memberInsured = req.body.memberInsured;
    }
    if (req.body.fullName) {
        newOfflineTravelQuote.fullName = req.body.fullName;
    }
    if (req.body.dob) {
        newOfflineTravelQuote.dob = req.body.dob;
    }
    if (req.body.city) {
        newOfflineTravelQuote.city = req.body.city;
    }
    if (req.body.pinCode) {
        newOfflineTravelQuote.pinCode = req.body.pinCode;
    }
    if (req.body.mobileNumber) {
        newOfflineTravelQuote.mobileNumber = req.body.mobileNumber;
    }
    if (req.body.journeyStartDate) {
        newOfflineTravelQuote.journeyStartDate = req.body.journeyStartDate;
    }
    if (req.body.journeyEndDate) {
        newOfflineTravelQuote.journeyEndDate = req.body.journeyEndDate;
    }
    if (req.body.DurationToBeInsured) {
        newOfflineTravelQuote.DurationToBeInsured = req.body.DurationToBeInsured;
    }
    if (req.body.sumInsured) {
        newOfflineTravelQuote.sumInsured = req.body.sumInsured;
    }
    if (req.body.status) {
        newOfflineTravelQuote.status = req.body.status;
    }
    if (req.body.paymentStatus) {
        newOfflineTravelQuote.paymentStatus = req.body.paymentStatus;
    }

    newOfflineTravelQuote.updatedDate = new Date();

    return newOfflineTravelQuote;
};

// generateReqNumber
const generateReqNumber = async () => {
    let reqNumber = "";
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    let milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    reqNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    return reqNumber;
};

module.exports = { AddTravelQuote, UpdateOfflineTravelQuote };
