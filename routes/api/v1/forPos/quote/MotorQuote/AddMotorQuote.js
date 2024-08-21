const OfflineMotorQuote = require("../../../../../../Models/Private/Pos/OfflineMotorQuote");

// @desc    Create a new offlineMotorQuote
const AddMotorQuote = async (req, res) => {
    try {
        const offlineMotorQuoteObj = await getOfflineMotorQuoteObj(req, "create");
        let newOfflineMotorQuote = await new OfflineMotorQuote(offlineMotorQuoteObj).save();
        res.status(200).json({
            message: "OfflineMotorQuote Successfully Created",
            variant: "success",
            commId: newOfflineMotorQuote._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a offlineMotorQuote by ID
const UpdateOfflineMotorQuote = async (req, res) => {
    try {
        const offlineMotorQuoteObj = await getOfflineMotorQuoteObj(req, "update");
        await updateMe(req, res, offlineMotorQuoteObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updateOfflineMotorQuote) => {
    try {
        const offlineMotorQuote = await OfflineMotorQuote.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateOfflineMotorQuote },
            { new: true }
        );
        if (!offlineMotorQuote) {
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

const getOfflineMotorQuoteObj = async (req, type) => {
    let newOfflineMotorQuote = {};

    if (type === "create") {
        newOfflineMotorQuote.createdBy = req.user.id;
        newOfflineMotorQuote.partner = req.user.id;
        newOfflineMotorQuote.reqNumber = await generateReqNumber();
    }

    if (req.body.vehicleVersion) {
        newOfflineMotorQuote.vehicleVersion = req.body.vehicleVersion;
    }
    
    if (req.body.registrationDate) {
        newOfflineMotorQuote.registrationDate = req.body.registrationDate;
    }
    if (req.body.registrationNumber) {
        newOfflineMotorQuote.registrationNumber = req.body.registrationNumber;
    }
    if (req.body.vehicleType) {
        newOfflineMotorQuote.vehicleType = req.body.vehicleType;
    }
    if (req.body.rtoNumber) {
        newOfflineMotorQuote.rtoNumber = req.body.rtoNumber;
    }
    if (req.body.policyType) {
        newOfflineMotorQuote.policyType = req.body.policyType;
    }
    if (req.body.haveOldPolicyDetail) {
        newOfflineMotorQuote.haveOldPolicyDetail = req.body.haveOldPolicyDetail;
    }
    if (req.body.expiryDate) {
        newOfflineMotorQuote.expiryDate = req.body.expiryDate;
    }
    if (req.body.claimStatus) {
        newOfflineMotorQuote.claimStatus = req.body.claimStatus;
    }
    if (req.body.previousInsurer) {
        newOfflineMotorQuote.previousInsurer = req.body.previousInsurer;
    }
    if (req.body.lastYearNCB) {
        newOfflineMotorQuote.lastYearNCB = req.body.lastYearNCB;
    }
    if (req.body.insurers) {
        newOfflineMotorQuote.insurers = req.body.insurers;
    }
    if (req.body.addOns) {
        newOfflineMotorQuote.addOns = req.body.addOns;
    }
    if (req.body.idvValue) {
        newOfflineMotorQuote.idvValue = req.body.idvValue;
    }
    if (req.body.customerEmail) {
        newOfflineMotorQuote.customerEmail = req.body.customerEmail;
    }
    if (req.body.mobileNumber) {
        newOfflineMotorQuote.mobileNumber = req.body.mobileNumber;
    }
    if (req.body.dateOfBirth) {
        newOfflineMotorQuote.dateOfBirth = req.body.dateOfBirth;
    }
    if (req.body.panNumber) {
        newOfflineMotorQuote.panNumber = req.body.panNumber;
    }
    if (req.body.rc) {
        newOfflineMotorQuote.rc = req.body.rc;
    }
    if (req.body.previousYearPolicy) {
        newOfflineMotorQuote.previousYearPolicy = req.body.previousYearPolicy;
    }
    if (req.body.invoice) {
        newOfflineMotorQuote.invoice = req.body.invoice;
    }
    if (req.body.panOrForm60) {
        newOfflineMotorQuote.panOrForm60 = req.body.panOrForm60;
    }
    if (req.body.voterDrivingPassportGst) {
        newOfflineMotorQuote.voterDrivingPassportGst = req.body.voterDrivingPassportGst;
    }
    if (req.body.quoteFromOther) {
        newOfflineMotorQuote.quoteFromOther = req.body.quoteFromOther;
    }
    if (req.body.paymentDoneSc) {
        newOfflineMotorQuote.paymentDoneSc = req.body.paymentDoneSc;
    }
    if (req.body.policyCopySection) {
        newOfflineMotorQuote.policyCopySection = req.body.policyCopySection;
    }
    if (req.body.other) {
        newOfflineMotorQuote.other = req.body.other;
    }
    if (req.body.remarks) {
        newOfflineMotorQuote.remarks = req.body.remarks;
    }

    newOfflineMotorQuote.updatedDate = new Date();

    return newOfflineMotorQuote;
};

// getgReqNumber
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

module.exports = { AddMotorQuote, UpdateOfflineMotorQuote };
