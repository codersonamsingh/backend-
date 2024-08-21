const OfflineHealthQuote = require("../../../../../../Models/Private/Pos/OfflineHealthQuote");

// @desc    Create a new offlineHealthQuote
const AddHealthQuote = async (req, res) => {
    try {
        const offlineHealthQuoteObj = await getOfflineHealthQuoteObj(req, "create");
        let newOfflineHealthQuote = await new OfflineHealthQuote(offlineHealthQuoteObj).save();
        res.status(200).json({
            message: "OfflineHealthQuote Successfully Created",
            variant: "success",
            commId: newOfflineHealthQuote._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a offlineHealthQuote by ID
const UpdateOfflineHealthQuote = async (req, res) => {
    try {
        const offlineHealthQuoteObj = await getOfflineHealthQuoteObj(req, "update");
        await updateMe(req, res, offlineHealthQuoteObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updateOfflineHealthQuote) => {
    try {
        const offlineHealthQuote = await OfflineHealthQuote.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateOfflineHealthQuote },
            { new: true }
        );
        if (!offlineHealthQuote) {
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

const getOfflineHealthQuoteObj = async (req, type) => {
    let newOfflineHealthQuote = {};

    if (type === "create") {
        newOfflineHealthQuote.createdBy = req.user.id;
        newOfflineHealthQuote.partner = req.user.id;
        newOfflineHealthQuote.reqNumber = await generateReqNumber();
    }

    if (req.body.fullName) {
        newOfflineHealthQuote.fullName = req.body.fullName;
    }
    if (req.body.memberInsured) {
        newOfflineHealthQuote.memberInsured = req.body.memberInsured;
    }
    if (req.body.dob) {
        newOfflineHealthQuote.dob = req.body.dob;
    }
    if (req.body.city) {
        newOfflineHealthQuote.city = req.body.city;
    }
    if (req.body.pinCode) {
        newOfflineHealthQuote.pinCode = req.body.pinCode;
    }
    if (req.body.mobileNumber) {
        newOfflineHealthQuote.mobileNumber = req.body.mobileNumber;
    }
    if (req.body.medicalHistory) {
        newOfflineHealthQuote.medicalHistory = req.body.medicalHistory;
    }
    if (req.body.sumInsured) {
        newOfflineHealthQuote.sumInsured = req.body.sumInsured;
    }
    if (req.body.status) {
        newOfflineHealthQuote.status = req.body.status;
    }
    if (req.body.paymentStatus) {
        newOfflineHealthQuote.paymentStatus = req.body.paymentStatus;
    }

    newOfflineHealthQuote.updatedDate = new Date();

    return newOfflineHealthQuote;
};

// generateReqNumber
const generateReqNumber = async () => {
    let reqNumber = "";
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();
    reqNumber = year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds + "" + milliseconds;
    return reqNumber;
};

module.exports = { AddHealthQuote, UpdateOfflineHealthQuote };
