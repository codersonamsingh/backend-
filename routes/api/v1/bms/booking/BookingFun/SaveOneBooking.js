const Booking = require("../../../../../../Models/Private/Employee/Booking");

// @desc    Create a new booking
const SaveOneBooking = async (req, res) => {
    try {
        const bookingObj = await getBookingObj(req, "create");
        let newBooking = await new Booking(bookingObj).save();
        res.status(200).json({
            message: "Booking Successfully Created",
            variant: "success",
            commId: newBooking._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

// @desc    Update a booking by ID
const UpdateBooking = async (req, res) => {
    try {
        const bookingObj = await getBookingObj(req, "update");
        await updateMe(req, res, bookingObj);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            variant: "error",
            message: "Internal server error",
        });
    }
};

const updateMe = async (req, res, updateBooking) => {
    try {
        const booking = await Booking.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updateBooking },
            { new: true }
        );
        if (!booking) {
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

const getBookingObj = async (req, type) => {
    let newBooking = {};

    if (type === "create") {
        newBooking.createdBy = req.user.id;
    }

    if (req.body.businessType) {
        newBooking.businessType = req.body.businessType;
    }
    if (req.body.businessName) {
        newBooking.businessName = req.body.businessName;
    }
    if (req.body.pospCode) {
        newBooking.pospCode = req.body.pospCode;
    }
    if (req.body.bpCode) {
        newBooking.bpCode = req.body.bpCode;
    }
    if (req.body.rmName) {
        newBooking.rmName = req.body.rmName;
    }
    if (req.body.rmCode) {
        newBooking.rmCode = req.body.rmCode;
    }
    if (req.body.function) {
        newBooking.function = {
            label: req.body.function.label,
            id: req.body.function.id,
        };
    }
    if (req.body.functionHead) {
        newBooking.functionHead = {
            label: req.body.functionHead.label,
            id: req.body.functionHead.id,
        };
    }
    if (req.body.bookingDate) {
        newBooking.bookingDate = req.body.bookingDate;
    }
    if (req.body.bookingMonth) {
        newBooking.bookingMonth = req.body.bookingMonth;
    }
    if (req.body.customerName) {
        newBooking.customerName = req.body.customerName;
    }
    if (req.body.customerEmailId) {
        newBooking.customerEmailId = req.body.customerEmailId;
    }
    if (req.body.customerMobileNo) {
        newBooking.customerMobileNo = req.body.customerMobileNo;
    }
    if (req.body.insuranceCompanyName) {
        newBooking.insuranceCompanyName = {
            label: req.body.insuranceCompanyName.label,
            id: req.body.insuranceCompanyName.id,
        };
    }
    if (req.body.insuranceBrokerId) {
        newBooking.insuranceBrokerId = {
            label: req.body.insuranceBrokerId.label,
            id: req.body.insuranceBrokerId.id,
        };
    }
    if (req.body.productCategory) {
        newBooking.productCategory = {
            label: req.body.productCategory.label,
            id: req.body.productCategory.id,
        };
    }
    if (req.body.product) {
        newBooking.product = {
            label: req.body.product.label,
            id: req.body.product.id,
        };
    }
    if (req.body.productType) {
        newBooking.productType = {
            label: req.body.productType.label,
            id: req.body.productType.id,
        };
    }
    if (req.body.policyNumber) {
        newBooking.policyNumber = req.body.policyNumber;
    }
    if (req.body.planType) {
        newBooking.planType = {
            label: req.body.planType.label,
            id: req.body.planType.id,
        };
    }
    if (req.body.premium) {
        newBooking.premium = req.body.premium;
    }
    if (req.body.netPremium) {
        newBooking.netPremium = req.body.netPremium;
    }
    if (req.body.odPremium) {
        newBooking.odPremium = req.body.odPremium;
    }
    if (req.body.commissionablePremium) {
        newBooking.commissionablePremium = req.body.commissionablePremium;
    }
    if (req.body.registrationNumber) {
        newBooking.registrationNumber = req.body.registrationNumber;
    }
    if (req.body.rto) {
        newBooking.rto = req.body.rto;
    }
    if (req.body.state) {
        newBooking.state = req.body.state;
    }
    if (req.body.fuelType) {
        newBooking.fuelType = {
            label: req.body.fuelType.label,
            id: req.body.fuelType.id,
        };
    }
    if (req.body.cubicCapacity) {
        newBooking.cubicCapacity = req.body.cubicCapacity;
    }
    if (req.body.cpa) {
        newBooking.cpa = req.body.cpa;
    }
    if (req.body.ncb) {
        newBooking.ncb = req.body.ncb;
    }
    if (req.body.loadingCapacity) {
        newBooking.loadingCapacity = {
            label: req.body.loadingCapacity.label,
            id: req.body.loadingCapacity.id,
        };
    }
    if (req.body.carrier) {
        newBooking.carrier = {
            label: req.body.carrier.label,
            id: req.body.carrier.id,
        };
    }
    if (req.body.seatingCapacityIncludingDriver) {
        newBooking.seatingCapacityIncludingDriver = {
            label: req.body.seatingCapacityIncludingDriver.label,
            id: req.body.seatingCapacityIncludingDriver.id,
        };
    }
    if (req.body.vehicleRegistrationYear) {
        newBooking.vehicleRegistrationYear = req.body.vehicleRegistrationYear;
    }
    if (req.body.make) {
        newBooking.make = req.body.make;
    }
    if (req.body.model) {
        newBooking.model = req.body.model;
    }
    if (req.body.policyStartDate) {
        newBooking.policyStartDate = req.body.policyStartDate;
    }
    if (req.body.policyEndDate) {
        newBooking.policyEndDate = req.body.policyEndDate;
    }
    if (req.body.verificationBy) {
        newBooking.verificationBy = {
            label: req.body.verificationBy.label,
            id: req.body.verificationBy.id,
        };
    }
    if (req.body.verificationDate) {
        newBooking.verificationDate = req.body.verificationDate;
    }
    if (req.body.remarks) {
        newBooking.remarks = req.body.remarks;
    }
    if (req.body.payoutToBePaidOn) {
        newBooking.payoutToBePaidOn = {
            label: req.body.payoutToBePaidOn.label,
            id: req.body.payoutToBePaidOn.id,
        };
    }
    if (req.body.payoutPercent) {
        newBooking.payoutPercent = req.body.payoutPercent;
    }
    if (req.body.tds5PercentOnAmt) {
        newBooking.tds5PercentOnAmt = req.body.tds5PercentOnAmt;
    }
    if (req.body.amount) {
        newBooking.amount = req.body.amount;
    }
    if (req.body.payinToBePaidOn) {
        newBooking.payinToBePaidOn = {
            label: req.body.payinToBePaidOn.label,
            id: req.body.payinToBePaidOn.id,
        };
    }
    if (req.body.payinPercent) {
        newBooking.payinPercent = req.body.payinPercent;
    }
    if (req.body.tds10Percent) {
        newBooking.tds10Percent = req.body.tds10Percent;
    }
    if (req.body.netIncomeInBankAccount) {
        newBooking.netIncomeInBankAccount = req.body.netIncomeInBankAccount;
    }
    if (req.body.retentionPercent) {
        newBooking.retentionPercent = req.body.retentionPercent;
    }
    if (req.body.amountReceivedFromInsurer) {
        newBooking.amountReceivedFromInsurer = req.body.amountReceivedFromInsurer;
    }
    if (req.body.finalAgentPayoutToBePaid) {
        newBooking.finalAgentPayoutToBePaid = req.body.finalAgentPayoutToBePaid;
    }
    if (req.body.netRevenue) {
        newBooking.netRevenue = req.body.netRevenue;
    }
    if (req.body.paidUnpaid) {
        newBooking.paidUnpaid = {
            label: req.body.paidUnpaid.label,
            id: req.body.paidUnpaid.id,
        };
    }
    if (req.body.paidToAgentCode) {
        newBooking.paidToAgentCode = req.body.paidToAgentCode;
    }
    if (req.body.outstanding) {
        newBooking.outstanding = req.body.outstanding;
    }
    if (req.body.invoiceRaised) {
        newBooking.invoiceRaised = {
            label: req.body.invoiceRaised.label,
            id: req.body.invoiceRaised.id,
        };
    }
    if (req.body.dispute) {
        newBooking.dispute = {
            label: req.body.dispute.label,
            id: req.body.dispute.id,
        };
    }

    newBooking.lastModified = new Date();

    return newBooking;
};

module.exports = { SaveOneBooking, UpdateBooking };